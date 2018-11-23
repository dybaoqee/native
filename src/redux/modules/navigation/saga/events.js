import {Navigation} from 'react-native-navigation'
import {eventChannel} from 'redux-saga'
import {
  put,
  all,
  fork,
  take,
  cancelled,
  cancel,
  getContext
} from 'redux-saga/effects'

import {READY} from '@/lib/client'
import * as actions from '../index'

const emitter = Navigation.events()

const navigationEvent = (event) =>
  emitter[`register${event}Listener`].bind(emitter)

const createNavigationChannel = (event) =>
  eventChannel((emitter) => {
    const fun = navigationEvent(event)
    const subscription = fun((args) => emitter(args || {}))
    return () => subscription.remove()
  })

const createNavigationSaga = (fun, dispatch) =>
  fork(function*() {
    let action
    const channel = createNavigationChannel(fun)
    try {
      while ((action = yield take(channel))) {
        yield put(dispatch(action))
      }
    } finally {
      if (yield cancelled()) {
        channel.close()
      }
    }
  })

export default function* navigationEventsSaga() {
  let tasks
  const channel = createNavigationChannel('AppLaunched')
  yield all([take(READY), take(channel)])
  do {
    yield* getContext('ready')
    if (tasks) yield cancel(...tasks)
    yield put({type: actions.APP_LAUNCHED})
    tasks = yield all([
      createNavigationSaga('ComponentDidAppear', actions.screenAppeared),
      createNavigationSaga('ComponentDidDisappear', actions.screenDisappeared),
      createNavigationSaga('BottomTabSelected', actions.tabSelected)
    ])
  } while (yield take(channel))
}
