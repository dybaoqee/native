import {fork, all} from 'redux-saga/effects'
import codePushSaga from 'react-native-code-push-saga'
import codePush from 'react-native-code-push'

import {CODEPUSH_DEPLOYMENT_KEY, CODEPUSH_ENABLED} from '@/config/const'
import amplitude from './amplitude/saga'
import sentry from './sentry/saga'
import firebase from './firebase/saga'
import navigation from './navigation/saga'

export default function* root() {
  const sagas = [
    fork(navigation),
    fork(firebase),
    fork(sentry),
    fork(amplitude)
  ]
  if (CODEPUSH_ENABLED) {
    sagas.push(
      fork(codePushSaga, {
        deploymentKey: CODEPUSH_DEPLOYMENT_KEY,
        syncOnResume: true,
        delayByInterval: 10 * 60, // 10 minutes
        syncOptions: {
          installMode: codePush.InstallMode.ON_NEXT_RESUME
        }
      })
    )
  }
  yield all(sagas)
}
