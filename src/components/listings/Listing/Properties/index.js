import {View, Dimensions} from 'react-native'

import Icon from '@/components/shared/Icon'
import Text from '@/components/shared/Text'
import {number} from '@/assets/format'
import styles, {iconColor} from './styles'

const Property = ({children, icon, width}) => (
  <View style={[styles.property, {width}]}>
    <Icon name={icon} type="light" color={iconColor} style={styles.icon} />
    <View style={styles.propertyBody}>
      <Text style={styles.propertyText}>{children}</Text>
    </View>
  </View>
)

Property.defaultProps = {
  get width() {
    return Dimensions.get('window').width / 3
  }
}

export default function ListingProperties(props) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Property icon="bed">
          {props.rooms} {props.rooms !== 1 ? 'quartos' : 'quarto'}
        </Property>
        <Property icon="bath">
          {props.bathrooms} {props.bathrooms !== 1 ? 'banheiros' : 'banheiro'}
        </Property>
        <Property icon="car">
          {props.garageSpots} {props.garageSpots !== 1 ? 'vagas' : 'vaga'}
        </Property>
      </View>
      <View style={styles.row}>
        <Property icon="building">
          {props.floor ? `${props.floor}° andar` : String.fromCharCode(0x2500)}
        </Property>
        <Property icon="cube">{props.area} m²</Property>
        <Property icon="usd-circle">
          {props.price && props.area
            ? `R$${number(Math.floor(props.price / props.area))}/m²`
            : String.fromCharCode(0x2500)}
        </Property>
      </View>
    </View>
  )
}
