import {takeLatest, all, call, fork, getContext} from 'redux-saga/effects'
import Firebase from 'react-native-firebase'

import {GET_USER_PROFILE} from '@/graphql/modules/user/queries'
import * as actions from './index'

const crashlytics = Firebase.crashlytics()

function reportError({error, code}) {
  let message = error.trace || error.message
  if (typeof message !== 'string') message = message.toString()
  crashlytics.recordError(code, message)
}

function identifySession({data}) {
  if (!data) return
  crashlytics.setUserIdentifier(data.id.toString())
}

function* initialize() {
  const graphql = yield getContext('graphql')
  const {
    data: {userProfile}
  } = yield call([graphql, graphql.query], {
    query: GET_USER_PROFILE,
    errorPolicy: 'ignore'
  })
  if (userProfile && userProfile.id)
    yield fork(identifySession, {data: userProfile})
}

export default function* crashlyticsSaga() {
  yield all([takeLatest(actions.REPORT_ERROR, reportError), fork(initialize)])
}
