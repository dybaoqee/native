import {pickBy} from 'lodash/fp'

export const UPDATE_CITY = 'search/UPDATE_CITY'
export const UPDATE_FILTERS = 'search/UPDATE_FILTERS'
export const CLEAR = 'search/CLEAR'

export const updateCity = (city) => ({type: UPDATE_CITY, city})
export const updateFilters = (filters) => ({type: UPDATE_FILTERS, filters})
export const clearFilters = () => ({type: CLEAR})

export const initialState = {
  filters: {}
}

const pickActiveFilters = pickBy(
  (value) => typeof value !== 'undefined' && value !== null
)

export default function listingsSearchReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CITY:
      return {...state, city: action.city}
    case UPDATE_FILTERS:
      return {
        ...state,
        filters: pickActiveFilters(action.filters)
      }
    case CLEAR:
      return {...state, filters: initialState.filters}
    default:
      return state
  }
}
