import {put, all, select, takeEvery} from 'redux-saga/effects'

import * as listingsSearch from '@/redux/modules/search'
import * as actions from './index'

const createEvent = (name, getParams) =>
  function* analyticsEvent(action) {
    let params
    if (getParams) params = yield select(getParams, action)
    yield put(actions.logEvent(name, params))
  }

export default function* analyticsEventsSaga() {
  yield all([
    takeEvery(
      listingsSearch.UPDATE_FILTERS,
      createEvent('search_listings', (state, {filters}) => ({filters}))
    )
  ])
}
