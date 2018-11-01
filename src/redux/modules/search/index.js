import _ from 'lodash'

export const UPDATE_CITY = 'search/UPDATE_CITY'
export const UPDATE_FILTERS = 'search/UPDATE_FILTERS'
export const CLEAR = 'search/CLEAR'

export const updateCity = (city) => ({type: UPDATE_CITY, city})
export const updateFilters = (filters) => ({type: UPDATE_FILTERS, filters})
export const clear = () => ({type: CLEAR})

const initialState = {
  city: 'rio-de-janeiro',
  filters: {
    types: ['Casa', 'Apartamento', 'Cobertura']
  }
}

export default function listingsMapScreenReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CITY:
      return {...state, city: action.city}
    case UPDATE_FILTERS:
      return {...state, filters: action.filters}
    case CLEAR:
      return {...initialState, state: state.state}
    default:
      return state
  }
}
