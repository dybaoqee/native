import _ from 'lodash/fp'
import {Navigation} from 'react-native-navigation'
import {call, all, put, select, takeEvery, getContext} from 'redux-saga/effects'

import {GET_USER_PROFILE} from '@/graphql/modules/user/queries'
import getBottomTabs from '@/config/tabs'
import defaultOptions from '@/config/screen'
import * as actions from '../index'
import {getStackRootId, getCurrentTabIndex} from '../selectors'

function* initialize() {
  Navigation.setDefaultOptions(defaultOptions)
  yield put(actions.updateStackRoot())
}

function* switchTab({tabIndex}) {
  const rootId = yield select(getStackRootId)
  const unselectedTabIndex = yield select(getCurrentTabIndex)
  Navigation.mergeOptions(rootId, {
    bottomTabs: {currentTabIndex: tabIndex}
  })
  yield put(
    actions.tabSelected({selectedTabIndex: tabIndex, unselectedTabIndex})
  )
}

const parseBottomTabs = _.flow(
  _.filter(_.get('component')),
  _.map(({component}) => ({
    stack: {
      children: [{component}],
      options: component.options
    }
  }))
)

function* updateStackRoot({rootId, tabIndex, children, data}) {
  const graphql = yield getContext('graphql')
  const {
    data: {userProfile}
  } = yield call([graphql, graphql.query], {
    query: GET_USER_PROFILE,
    fetchPolicy: 'cache-first',
    errorPolicy: 'ignore'
  })
  const bottomTabs = parseBottomTabs(
    yield select(getBottomTabs, {
      user: userProfile || {},
      ...data
    })
  )
  if (children.length) bottomTabs[tabIndex].stack.children.push(...children)
  Navigation.setRoot({
    root: {
      bottomTabs: {
        id: rootId,
        options: {
          bottomTabs: {
            currentTabIndex: tabIndex,
            visible: false,
            drawBehind: true
          }
        },
        children: bottomTabs
      }
    }
  })
}

export default function* navigationActionsSaga() {
  yield all([
    takeEvery(actions.APP_LAUNCHED, initialize),
    takeEvery(actions.SWITCH_TAB, switchTab),
    takeEvery(actions.UPDATE_STACK_ROOT, updateStackRoot)
  ])
}
