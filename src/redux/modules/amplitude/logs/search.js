import {logEvent} from '../index'

export const logSearchLoadMore = ({loadMoreCount}) =>
  logEvent('listing-search-load-more', {count: loadMoreCount})

export const logFiltersOpen = () => logEvent('listing-search-filter-open')

export const logFiltersClose = () => logEvent('listing-search-filter-close')

export const logFiltersApply = ({filters, values}) =>
  logEvent('listing-search-filter-apply', {
    filters,
    values
  })

export const logFiltersClear = ({filters, values}) =>
  logEvent('listing-search-filter-clear', {
    filters,
    values
  })

export const logNeighborhoodsOpen = () =>
  logEvent('listing-search-neighborhood-open')

export const logNeighborhoodsClose = () =>
  logEvent('listing-search-neighborhood-close')

export const logNeighborhoodsApply = ({neighborhoods}) =>
  logEvent('listing-search-neighborhood-apply', {
    neighborhoods
  })

export const logFeaturedNeighborhoodApply = ({neighborhood}) =>
  logEvent('listing-search-neighborhood-image', {
    neighborhood
  })

export const logNeighborhoodsClear = () =>
  logEvent('listing-search-neighborhood-clear')

export const logChangeCity = ({city}) =>
  logEvent('listing-search-neighborhood-change-city', {city})
