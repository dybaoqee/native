import {all, put, takeEvery} from 'redux-saga/effects'

import * as auth from '@/redux/helpers/auth'
import * as nav from '@/redux/modules/navigation'
import * as actions from './index'

const logEvent = (event, getData) =>
  function* logEvent(action) {
    yield put(
      actions.logEvent(
        event,
        typeof getData === 'function' ? getData(action) : getData
      )
    )
  }

export default function* amplitudeEventsSaga() {
  yield all([
    takeEvery(nav.APP_LAUNCHED, logEvent('navigation-app-launched')),
    takeEvery(
      nav.SCREEN_APPEARED,
      logEvent('navigation-screen-appeared', ({id, name}) => ({
        screen: {id, name}
      }))
    ),
    takeEvery(auth.signedIn, logEvent('signed-in')),
    takeEvery(auth.signedUp, logEvent('signed-up')),
    takeEvery(auth.signedOut, logEvent('signed-out'))
  ])
}
