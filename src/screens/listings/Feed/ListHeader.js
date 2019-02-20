import {PureComponent, Fragment} from 'react'
import {connect} from 'react-redux'
import {compose} from 'recompose'
import {View, Text} from '@emcasa/ui-native'

import neighborhoods from '@/config/filters/neighborhoods'
import {logEvent} from '@/redux/modules/amplitude'
import {updateFilters} from '@/redux/modules/search'
import {
  hasSearchFilters,
  getSearchFilters,
  getSearchCity
} from '@/redux/modules/search/selectors'
import ActiveFilters from '@/components/listings/ActiveFilters'
import RecommendedFilters from '@/components/listings/RecommendedFilters'

const feedTitle = (citySlug) => {
  switch (citySlug) {
    case 'rio-de-janeiro':
      return 'Imóveis no Rio de Janeiro'
    case 'sao-paulo':
      return 'Imóveis em São Paulo'
    default:
      return 'Imóveis à venda'
  }
}

class ListHeader extends PureComponent {
  onChangeFilters = (nextValue) => {
    const filters = {...this.props.filters, ...nextValue}
    this.props.updateFilters(filters)
    this.props.logEvent('listing-search-filter-clear', {
      filters: Object.keys(nextValue),
      values: filters
    })
  }

  onChangeNeighborhood = (nextValue) => {
    this.props.updateFilters({...this.props.filters, ...nextValue})
    this.props.logEvent('listing-search-neighborhood-apply', {
      neighborhoods: nextValue.neighborhoodsSlugs
    })
  }

  render() {
    const {hasFilters, filters, city} = this.props
    return (
      <View mb="5px" mt="25px" mr="15px" ml="15px">
        <View mb="15px">
          {hasFilters ? (
            <ActiveFilters filters={filters} onChange={this.onChangeFilters} />
          ) : city ? (
            <Fragment>
              <Text fontWeight="500">Bairros mais buscados</Text>
              <View mr="-15px" ml="-15px">
                <RecommendedFilters
                  onChange={this.onSelectNeighborhood}
                  data={neighborhoods[city] || []}
                />
              </View>
            </Fragment>
          ) : null}
        </View>
        <Text fontWeight="500">
          {hasFilters ? 'Resultados da busca' : feedTitle(city)}
        </Text>
      </View>
    )
  }
}

export default compose(
  connect(
    (state) => ({
      hasFilters: hasSearchFilters(state),
      filters: getSearchFilters(state),
      city: getSearchCity(state)
    }),
    {logEvent, updateFilters}
  )
)(ListHeader)
