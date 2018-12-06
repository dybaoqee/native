import {all, call, fork, takeEvery, setContext} from 'redux-saga/effects'
import RNAmplitude from 'react-native-amplitude-analytics'

import {AMPLITUDE_API_KEY, AMPLITUDE_ENABLED} from '@/config/const'
import eventsSaga from './events'
import * as actions from './index'

let amplitude

function* initializeAmplitude() {
  amplitude = new RNAmplitude(AMPLITUDE_API_KEY)
  yield setContext({amplitude})
}

function logEvent({event, data}) {
  amplitude.logEvent(event, data)
}

export default function* amplitudeSaga() {
  if (!AMPLITUDE_ENABLED) return
  yield call(initializeAmplitude)
  yield all([fork(eventsSaga), takeEvery(actions.LOG_EVENT, logEvent)])
}
