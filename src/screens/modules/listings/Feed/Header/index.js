import _ from 'lodash/fp'
import {PureComponent} from 'react'
import {View, Image, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'

import {getSearchFilters} from '@/redux/modules/search/selectors'
import {abbrevPrice} from '@/assets/format'
import Text from '@/components/shared/Text'
import styles from './styles'

const omitEmpty = _.omitBy(_.isEmpty)

const activeFilters = _.flow(
  _.entries,
  _.map(([name, value]) => activeFilters[name].call(null, value)),
  _.filter(_.identity),
  _.join(', ')
)

activeFilters.types = ([...value]) => {
  if (value.length === 3) return null // All options are selected by default
  const result = value.pop()
  if (value.length) return `${result} e ${value.length}+`
  return result
}
activeFilters.garageSpots = ({min, max}) => {
  if (!max || max >= 4) return `${min}+ vagas`
  return `${min}-${max >= 4 ? '4+' : max} vagas`
}
activeFilters.rooms = ({min, max}) => {
  if (!max || max >= 4) return `${min}+ quartos`
  return `${min}-${max >= 4 ? '4+' : max} quartos`
}
activeFilters.price = ({min, max}) => {
  if (!max || max >= 10000000) return `R$${abbrevPrice(min)}+`
  return `R$${abbrevPrice(min)}-${abbrevPrice(max)}`
}
activeFilters.area = ({min, max}) => {
  if (!max || max >= 1000) return `${min}m²+`
  return `${min}-${max}m²`
}
activeFilters.neighborhoodsSlugs = ([...value]) => {
  const neighborhoods = value.map(_.upperFirst)
  const result = neighborhoods.pop()
  if (neighborhoods.length) return `${result} e ${neighborhoods.length}+`
  return result
}

const Icon = () => (
  <Image
    style={[styles.icon, {width: 20, height: (33 * 20) / 54}]}
    source={require('@/assets/img/filter-icon.png')}
  />
)

class ListingsFeedHeader extends PureComponent {
  render() {
    const {options, onPress} = this.props
    const filters = omitEmpty(options)
    const hasFilters = !_.isEmpty(filters)
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.touchableContainer} onPress={onPress}>
          <Icon />
          <Text
            style={[styles.text, hasFilters && styles.textActive]}
            allowFontScaling
            adjustsFontSizeToFit
            numberOfLines={1}
            minimumFontScale={0.85}
          >
            {(hasFilters && activeFilters(filters)) || 'Sem filtros aplicados'}
          </Text>
          <Text style={styles.buttonText}>Filtrar</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default connect((state) => ({
  options: getSearchFilters(state)
}))(ListingsFeedHeader)
