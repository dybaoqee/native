import {takeLatest, all, fork, call, getContext} from 'redux-saga/effects'
import Firebase from 'react-native-firebase'

import {GET_USER_PROFILE} from '@/graphql/modules/user/queries'
import {getScreenByName} from '@/screens'
import * as navigation from '@/redux/modules/navigation'
import * as actions from './index'
import analyticsEventsSaga from './events'

const analytics = Firebase.analytics()

function logEvent({name, params}) {
  analytics.logEvent(name, params)
}

function identifySession({data}) {
  if (data) analytics.setUserId(data.id.toString())
}

function logCurrentScreen({name}) {
  analytics.setCurrentScreen(name, getScreenByName(name).displayName)
}

function* initialize() {
  const graphql = yield getContext('graphql')
  const {
    data: {userProfile}
  } = yield call([graphql, graphql.query], {
    query: GET_USER_PROFILE,
    errorPolicy: 'ignore'
  })
  analytics.setAnalyticsCollectionEnabled(true)
  analytics.setMinimumSessionDuration(10 * 1000)
  analytics.setSessionTimeoutDuration(15 * 60 * 1000)
  if (userProfile && userProfile.id)
    yield fork(identifySession, {data: userProfile})
}

export default function* analyticsSaga() {
  yield all([
    takeLatest(actions.LOG_EVENT, logEvent),
    takeLatest(navigation.SCREEN_APPEARED, logCurrentScreen),
    fork(analyticsEventsSaga),
    fork(initialize)
  ])
}
