import {fork, all} from 'redux-saga/effects'

import events from './events'
import actions from './actions'

export default function* navigationSaga() {
  yield all([fork(events), fork(actions)])
}
