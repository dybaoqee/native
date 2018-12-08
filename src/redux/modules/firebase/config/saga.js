import {eventChannel} from 'redux-saga'
import {all, call, put, select, fork, takeLatest} from 'redux-saga/effects'
import {AppState} from 'react-native'
import Firebase from 'react-native-firebase'

import {REMOTE_CONFIG_ENABLED} from '@/config/const'
import * as actions from './index'
import {getConfig} from './selectors'

const config = Firebase.config()

const appStateEvent = (...states) =>
  eventChannel((emitter) => {
    const fun = (currentState) => {
      if (currentState in states) emitter(currentState)
    }
    AppState.addEventListener('change', fun)
    return () => AppState.removeEventListener('change', fun)
  })

async function loadConfig() {
  await config.fetch()
  return await config.activateFetched()
}

function* getValue(key) {
  const result = yield call([config, config.getValue], key)
  if (result) return result.val()
  return yield select(getConfig, {key})
}

function* fetchConfig() {
  if (yield call(loadConfig)) {
    yield put(
      actions.updateValue(
        'minAppVersion',
        yield call(getValue, 'minAppVersion')
      )
    )
  }
}

function* initializeRemoteConfig() {
  if (__DEV__) config.enableDeveloperMode()
  yield fetchConfig()
}

export default function* fcmSaga() {
  if (!REMOTE_CONFIG_ENABLED) return
  yield all([
    takeLatest(appStateEvent('active'), fetchConfig),
    fork(initializeRemoteConfig)
  ])
}
