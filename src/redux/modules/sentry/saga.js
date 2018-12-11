import {all, call, fork, take, takeEvery} from 'redux-saga/effects'
import {Sentry, SentryLog} from 'react-native-sentry'

import * as auth from '@/redux/helpers/auth'
import {READY} from '@/lib/client'
import {
  SENTRY_DNS,
  SENTRY_ENABLED,
  RELEASE_PROFILE,
  VERSION_FULL_NAME
} from '@/config/const'
import {SCREEN_APPEARED} from '../navigation'

function initializeSentry() {
  Sentry.config(SENTRY_DNS, {
    logLevel: SentryLog.Debug
  }).install()
  Sentry.setTagsContext({
    environment: RELEASE_PROFILE
  })
  Sentry.setVersion(VERSION_FULL_NAME)
}

const identifySession = (getUserProfile) =>
  function* identifySession(action) {
    const user = yield call(getUserProfile, action)
    if (user && user.id)
      Sentry.setUserContext({
        id: user.id,
        email: user.email,
        extra: {
          role: user.role
        }
      })
    else Sentry.setUserContext({})
  }

const initializeSession = identifySession(auth.getUserProfile)

const logBreadcrumb = ({data: getData, ...options}) =>
  function logBreadcrumb({type, ...action}) {
    Sentry.captureBreadcrumb({
      message: `Action "${type}"`,
      category: 'action',
      data: typeof getData === 'function' ? getData(action) : undefined,
      ...options
    })
  }

export default function* sentrySaga() {
  if (!SENTRY_ENABLED) return
  yield call(initializeSentry)
  yield take(READY)
  yield fork(initializeSession)
  yield all([
    takeEvery(
      SCREEN_APPEARED,
      logBreadcrumb({data: ({name}) => ({screenName: name})})
    ),
    takeEvery(auth.signedUp, identifySession(auth.signedUp.getUserProfile)),
    takeEvery(auth.signedIn, identifySession(auth.signedIn.getUserProfile)),
    takeEvery(auth.signedOut, identifySession(auth.signedOut.getUserProfile))
  ])
}
