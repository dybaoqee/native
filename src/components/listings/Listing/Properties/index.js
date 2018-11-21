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

const stringifyProp = (
  singular,
  plural = singular,
  empty = String.fromCharCode(0x2500)
) => (value) => {
  const toSingular =
    typeof singular === 'function' ? singular : (x) => `${x} ${singular}`
  const toPlural =
    typeof plural === 'function' ? plural : (x) => `${x} ${plural}`
  if (!value || value == '0') return empty
  if (isNaN(value)) return value
  const amount = parseInt(value, 10)
  if (amount != 1 && toPlural) return toPlural(amount)
  else return toSingular(amount)
}

const numericProp = (singular, plural = singular + 's') =>
  stringifyProp(singular, plural)
const ordinalProp = (word) => stringifyProp((num) => `${num}° ${word}`)

export default function ListingProperties(props) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Property icon="bed">{numericProp('quarto')(props.rooms)}</Property>
        <Property icon="bath">
          {numericProp('banheiro')(props.bathrooms)}
        </Property>
        <Property icon="car">{numericProp('vaga')(props.garageSpots)}</Property>
      </View>
      <View style={styles.row}>
        <Property icon="building">{ordinalProp('andar')(props.floor)}</Property>
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
