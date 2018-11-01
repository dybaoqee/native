import _ from 'lodash/fp'
import {createSelector} from 'reselect'

const omitEmpty = _.omitBy(_.isEmpty)

export const getSearchScreen = (state) => state.search

export const getSearchCity = (state) => getSearchScreen(state).city

export const getSearchFilters = (state) =>
  omitEmpty(getSearchScreen(state).filters || {})

const parseRange = (name, {min, max}) => ({
  [`min${_.upperFirst(name)}`]: min,
  [`max${_.upperFirst(name)}`]: max
})

export const getSearchFiltersQuery = createSelector(
  getSearchFilters,
  _.flow(
    ({price, area, rooms, garageSpots, ...filters}) =>
      Object.assign(
        {},
        filters,
        price && parseRange('price', price),
        area && parseRange('area', area),
        rooms && parseRange('rooms', rooms),
        garageSpots && parseRange('garageSpots', garageSpots)
      ),
    _.pickBy(_.identity)
  )
)
