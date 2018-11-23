import {Dimensions} from 'react-native'
import styled from 'styled-components/native'
import {themeGet} from 'styled-system'
import {View, Row, Col, Text, Icon} from '@emcasa/ui-native'

import {number} from '@/config/formatting'

const Property = ({children, icon}) => (
  <Col width={1 / 3} alignItems="center">
    <Icon name={icon} type="light" color="dark" mb="7px" />
    <Row>
      <Text fontSize={13} fontWeight="500" color="dark">
        {children}
      </Text>
    </Row>
  </Col>
)

const Container = styled(View)`
  border-top-width: 0.5;
  border-bottom-width: 0.5;
  border-color: ${themeGet('colors.lightGrey')};
  padding-vertical: 5;
`

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
    <Container>
      <Row justifyContent="center" alignItems="flex-start" pt="20px">
        <Property icon="bed">{numericProp('quarto')(props.rooms)}</Property>
        <Property icon="bath">
          {numericProp('banheiro')(props.bathrooms)}
        </Property>
        <Property icon="car">{numericProp('vaga')(props.garageSpots)}</Property>
      </Row>
      <Row justifyContent="center" alignItems="flex-start" pt="25px" pb="20px">
        <Property icon="building">{ordinalProp('andar')(props.floor)}</Property>
        <Property icon="cube">{props.area} m²</Property>
        <Property icon="usd-circle">
          {props.price && props.area
            ? `R$${number(Math.floor(props.price / props.area))}/m²`
            : String.fromCharCode(0x2500)}
        </Property>
      </Row>
    </Container>
  )
}
