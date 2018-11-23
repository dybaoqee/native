import {fork, all} from 'redux-saga/effects'
import codePushSaga from 'react-native-code-push-saga'
import codePush from 'react-native-code-push'

import firebase from './firebase/saga'
import navigation from './navigation/saga'

export default function* root() {
  yield all([
    fork(navigation),
    fork(firebase),
    fork(codePushSaga, {
      syncOnResume: true,
      delayByInterval: 10 * 60, // 10 minutes
      syncOptions: {
        installMode: codePush.InstallMode.ON_NEXT_RESUME
      }
    })
  ])
}
