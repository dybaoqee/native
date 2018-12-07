import {eventChannel} from 'redux-saga'
import {all, call, put, fork, takeEvery} from 'redux-saga/effects'
import Firebase from 'react-native-firebase'

import * as actions from './index'

const notifications = Firebase.notifications()

const getInitialNotification = () => notifications.getInitialNotification()

const foregroundNotificationChannel = () =>
  eventChannel((emit) =>
    notifications.onNotification((notification) => emit({notification}))
  )

const backgroundNotificationChannel = () =>
  eventChannel((emit) =>
    notifications.onNotificationOpened(({notification, action}) =>
      emit({notification, action})
    )
  )

function* notificationReceived({notification}) {
  yield put(actions.notificationReceived(notification))
}

function* notificationOpened({notification, action}) {
  yield put(actions.notificationOpened(notification, action))
}

function* initialize() {
  const response = yield call(getInitialNotification)
  if (response)
    yield put(
      actions.notificationInitialized(response.notification, response.action)
    )
}

export default function* fcmSaga() {
  yield all([
    takeEvery(backgroundNotificationChannel(), notificationOpened),
    takeEvery(foregroundNotificationChannel(), notificationReceived),
    fork(initialize)
  ])
}
