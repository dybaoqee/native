import _ from 'lodash/fp'
import {isEqualWith} from 'lodash'
import {createSelector} from 'reselect'

const compareFilter = (a, b) => {
  if (_.isArray(a) && _.isArray(b))
    return _.isEqual(a.slice().sort(), b.slice().sort())
}

export const getSearchScreen = (state) => state.search

export const getSearchCity = (state) => getSearchScreen(state).city

export const getSearchFilters = (state) => getSearchScreen(state).filters

export const hasSearchFilters = createSelector(
  getSearchFilters,
  (filters) => !isEqualWith(filters, {}, compareFilter)
)

const parseRange = (name, {min, max}) => ({
  [`min${_.upperFirst(name)}`]: min,
  [`max${_.upperFirst(name)}`]: max
})

export const getSearchFiltersQuery = createSelector(
  getSearchFilters,
  getSearchCity,
  _.flow.convert({cap: false})(
    ({price, area, rooms, garageSpots, suites, ...filters}, citySlug) =>
      Object.assign(
        {citiesSlug: citySlug ? [citySlug] : undefined},
        filters,
        price && parseRange('price', price),
        area && parseRange('area', area),
        rooms && parseRange('rooms', rooms),
        suites && parseRange('suites', suites),
        garageSpots && parseRange('garageSpots', garageSpots)
      ),
    _.pickBy(_.negate(_.isNil))
  )
)
