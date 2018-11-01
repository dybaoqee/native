import {put, all, select, takeEvery} from 'redux-saga/effects'

import * as auth from '@/redux/modules/auth'
import * as interestForm from '@/redux/modules/interest/form'
import * as listingsSearch from '@/redux/modules/search'
import {getInterestType} from '@/redux/modules/interest/types/selectors'
import * as actions from './index'

const createEvent = (name, getParams) =>
  function* analyticsEvent(action) {
    let params
    if (getParams) params = yield select(getParams, action)
    yield put(actions.logEvent(name, params))
  }

export default function* analyticsEventsSaga() {
  yield all([
    takeEvery(auth.SIGN_IN, createEvent('sign_in')),
    takeEvery(auth.SIGN_UP, createEvent('sign_up')),
    takeEvery(auth.SIGN_OUT, createEvent('sign_out')),
    takeEvery(
      interestForm.REQUEST,
      createEvent('new_listing_interest', (state, {id, params}) => ({
        id,
        type: getInterestType(state, {id: params.interest_type_id})
      }))
    ),
    takeEvery(
      listingsSearch.UPDATE_FILTERS,
      createEvent('search_listings', (state, {filters}) => ({filters}))
    )
  ])
}
