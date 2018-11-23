import {View, Row, Col, Text} from '@emcasa/ui-native'

import * as format from '@/assets/format'

const Section = ({children, title}) => (
  <Col flex={1}>
    <View mb="10px">
      <Text color="dark" fontWeight="500">
        {title.toUpperCase()}
      </Text>
    </View>
    {children}
  </Col>
)

const formatPrice = (price) =>
  price ? `R$ ${format.number(price)}` : String.fromCharCode(0x2500)
export default function ListingDescription(props) {
  const {maintenanceFee, propertyTax} = props
  return (
    <View pr="15px" pl="15px" mt="20px">
      <Row mb="15px">
        <Section title="O Imóvel">
          <Text>{props.description}</Text>
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
            Cód. imóvel #{props.id}
          </Text>
        </View>
      </Row>
      <Row mb="20px">
        <Section title="Tipo do Imóvel">
          <Text>{props.type}</Text>
        </Section>
      </Row>
      {Boolean(maintenanceFee || propertyTax) && (
        <Row mb="20px">
          <Section title="Condomínio">
            <Text fontSize={16} fontWeight="500">
              {formatPrice(maintenanceFee)}
            </Text>
          </Section>
          <Section title="IPTU">
            <Text fontSize={16} fontWeight="500">
              {formatPrice(propertyTax)}
            </Text>
          </Section>
        </Row>
      )}
    </View>
  )
}
