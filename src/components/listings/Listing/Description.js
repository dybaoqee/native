import {View, Row, Col, Text} from '@emcasa/ui-native'

import * as format from '@/config/formatting'

const Section = ({children, title}) => (
  <Col flex={1}>
    <View mb="5px">
      <Text color="grey" fontWeight="500">
        {title.toUpperCase()}
      </Text>
    </View>
    {children}
  </Col>
)

const formatPrice = (price, suffix = '') =>
  price
    ? `R$ ${format.number(price.toFixed(2))} ${suffix}`
    : String.fromCharCode(0x2500)

export default function ListingDescription({
  id,
  type,
  area,
  price,
  description,
  propertyTax,
  maintenanceFee
}) {
  const tableRows = [{label: 'Tipo do imóvel', value: type}]
  if (maintenanceFee)
    tableRows.push({label: 'Condomínio', value: formatPrice(maintenanceFee)})
  if (propertyTax)
    tableRows.push({label: 'IPTU/ano', value: formatPrice(propertyTax)})
  if (price && area)
    tableRows.push({label: 'Preço/m²', value: formatPrice(price / area)})

  return (
    <View pr="15px" pl="15px" mt="20px" mb="10px">
      <Row mb="15px">
        <Section title="O Imóvel">
          <Text>{description || String.fromCharCode(0x2500)}</Text>
        </Section>
      </Row>
      <Row mb="20px">
        <View
          borderRadius={20}
          bg="#f0f0f0"
          pt="2.5px"
          pb="2px"
          pr="10px"
          pl="10px"
        >
          <Text fontSize={13} color="grey">
            Cód. imóvel #{id}
          </Text>
        </View>
      </Row>
      {Boolean(tableRows.length) && (
        <Col mb="20px" pb="15px" bg="white" elevation={4} borderRadius={4}>
          {tableRows.map(({label, value}) => (
            <Row key={label} flex={1} p="20px" pb="0">
              <Col flex={1}>
                <Text color="dark">{label}</Text>
              </Col>
              <Col>
                <Text color="dark">{value}</Text>
              </Col>
            </Row>
          ))}
        </Col>
      )}
    </View>
  )
}
