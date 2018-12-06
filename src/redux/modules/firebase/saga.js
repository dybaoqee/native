import {all, fork, take} from 'redux-saga/effects'

import {READY} from '@/lib/client'
import messaging from './messaging/saga'
import notifications from './notifications/saga'

export default function* firebaseSaga() {
  yield take(READY)
  if (process.env.NODE_ENV !== 'e2e')
    yield all([fork(messaging), fork(notifications)])
}
