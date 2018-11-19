import {Fragment} from 'react'
import {connect} from 'react-redux'
import {compose} from 'recompose'
import {View, Text} from '@emcasa/ui-native'

import {neighborhoods} from '@/config/filters'
import {updateFilters} from '@/redux/modules/search'
import {
  hasSearchFilters,
  getSearchFilters
} from '@/redux/modules/search/selectors'
import ActiveFilters from '@/components/listings/ActiveFilters'
import RecommendedFilters from '@/components/listings/RecommendedFilters'

function ListHeader({hasFilters, filters, updateFilters}) {
  const onChange = (nextValue) => updateFilters({...filters, ...nextValue})
  return (
    <View mb="5px" mt="25px" mr="15px" ml="15px">
      <View mb="15px">
        {hasFilters ? (
          <ActiveFilters filters={filters} onChange={onChange} />
        ) : (
          <Fragment>
            <Text fontWeight="500">Bairros mais buscados</Text>
            <View mr="-15px" ml="-15px">
              <RecommendedFilters onChange={onChange} data={neighborhoods} />
            </View>
          </Fragment>
        )}
      </View>
      <Text fontWeight="500">
        {hasFilters ? 'Resultados da busca' : 'Imóveis no Rio de Janeiro'}
      </Text>
    </View>
  )
}

export default compose(
  connect(
    (state) => ({
      hasFilters: hasSearchFilters(state),
      filters: getSearchFilters(state)
    }),
    {updateFilters}
  )
)(ListHeader)
