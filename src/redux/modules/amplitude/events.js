import {all, put, takeEvery} from 'redux-saga/effects'

import {logSignOut} from './logs/auth'
import {logBreadcrumb, logAppLaunched} from './logs/navigation'
import * as auth from '@/redux/helpers/auth'
import * as nav from '@/redux/modules/navigation'

const logEvent = (action, getData) =>
  function* logEvent(action) {
    yield put(action(typeof getData === 'function' ? getData(action) : getData))
  }

export default function* amplitudeEventsSaga() {
  yield all([
    takeEvery(nav.APP_LAUNCHED, logEvent(logAppLaunched)),
    takeEvery(
      nav.SCREEN_APPEARED,
      logEvent(logBreadcrumb, ({id, name}) => ({id, name}))
    ),
    takeEvery(auth.signedOut, logEvent(logSignOut))
  ])
}
