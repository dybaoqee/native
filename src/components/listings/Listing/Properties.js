import {padStart} from 'lodash'
import {Dimensions} from 'react-native'
import styled from 'styled-components/native'
import {themeGet} from 'styled-system'
import {View, Row, Col, Text} from '@emcasa/ui-native'

const Property = ({children, title}) => (
  <Col width={1 / 3}>
    <Row>
      <Text color="grey">{title.toUpperCase()}</Text>
    </Row>
    <Row>
      <Text fontSize="large" color="dark">
        {isNaN(children)
          ? children
          : children
            ? padStart(children, 2, '0')
            : String.fromCharCode(0x2500)}
      </Text>
    </Row>
  </Col>
)

const Container = styled(View)`
  border-bottom-width: 0.5;
  border-color: ${themeGet('colors.grey')};
  padding-vertical: 5;
  margin-horizontal: 15px;
`

Property.defaultProps = {
  get width() {
    return Dimensions.get('window').width / 3
  }
}

export default function ListingProperties({
  bathrooms,
  suites,
  rooms,
  floor,
  area,
  garageSpots
}) {
  return (
    <Container>
      <Row justifyContent="center" alignItems="flex-start" pt="20px">
        <Property title="Quartos">{rooms}</Property>
        <Property title="Suítes">{suites}</Property>
        <Property title="Banheiros">{bathrooms}</Property>
      </Row>
      <Row justifyContent="center" alignItems="flex-start" pt="25px" pb="20px">
        <Property title="Vagas">{garageSpots}</Property>
        <Property title="Área">{area || '0'} m²</Property>
        <Property title="Andar">
          {floor ? `${floor}°` : String.fromCharCode(0x2500)}
        </Property>
      </Row>
    </Container>
  )
}
