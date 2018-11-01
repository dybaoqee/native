import {fork, all} from 'redux-saga/effects'
import {networkEventsListenerSaga} from 'react-native-offline'
import codePushSaga from 'react-native-code-push-saga'
import codePush from 'react-native-code-push'

import firebase from './firebase/saga'
import auth from './auth/saga'
import relatedListings from './relatedListings/saga'
import gallery from './gallery/saga'
import interest from './interest/saga'
import neighborhoods from './neighborhoods/saga'
import screens from '@/screens/modules/saga'

export default function* root() {
  yield all([
    fork(screens),
    fork(firebase),
    fork(auth),
    fork(relatedListings),
    fork(gallery),
    fork(interest),
    fork(neighborhoods),
    fork(codePushSaga, {
      syncOnResume: true,
      delayByInterval: 10 * 60, // 10 minutes
      syncOptions: {
        installMode: codePush.InstallMode.ON_NEXT_RESUME
      }
    }),
    fork(networkEventsListenerSaga, {
      timeout: 2000,
      checkConnectionInterval: 20000
    })
  ])
}
