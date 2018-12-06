import {all, fork, take} from 'redux-saga/effects'

import {READY} from '@/lib/client'
import analytics from './analytics/saga'
import messaging from './messaging/saga'
import notifications from './notifications/saga'

export default function* firebaseSaga() {
  yield take(READY)
  if (process.env.NODE_ENV !== 'e2e')
    yield all([fork(analytics), fork(messaging), fork(notifications)])
}
