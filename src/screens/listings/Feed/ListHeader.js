import {Fragment} from 'react'
import {connect} from 'react-redux'
import {compose} from 'recompose'
import {View, Text} from '@emcasa/ui-native'

import neighborhoods from '@/config/filters/neighborhoods'
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

function ListHeader({hasFilters, filters, city, updateFilters}) {
  const onChange = (nextValue) => updateFilters({...filters, ...nextValue})
  return (
    <View mb="5px" mt="25px" mr="15px" ml="15px">
      <View mb="15px">
        {hasFilters ? (
          <ActiveFilters filters={filters} onChange={onChange} />
        ) : city ? (
          <Fragment>
            <Text fontWeight="500">Bairros mais buscados</Text>
            <View mr="-15px" ml="-15px">
              <RecommendedFilters
                onChange={onChange}
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

export default compose(
  connect(
    (state) => ({
      hasFilters: hasSearchFilters(state),
      filters: getSearchFilters(state),
      city: getSearchCity(state)
    }),
    {updateFilters}
  )
)(ListHeader)
