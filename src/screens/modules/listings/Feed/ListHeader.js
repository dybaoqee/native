import {connect} from 'react-redux'
import {compose} from 'recompose'
import {View, Text} from '@emcasa/ui-native'

import {hasSearchFilters} from '@/redux/modules/search/selectors'

function ListHeader({hasFilters}) {
  return (
    <View mb="5px" mt="5px" mr="15px" ml="15px">
      <Text fontWeight="500">
        {hasFilters ? 'Resultados da busca' : 'Imóveis no Rio de Janeiro'}
      </Text>
    </View>
  )
}

export default compose(
  connect((state) => ({
    hasFilters: hasSearchFilters(state)
  }))
)(ListHeader)
