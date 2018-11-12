import {Image} from 'react-native'
import {Row, Col, Text, Button} from '@emcasa/ui-native'

export default function UserListingEmpty({onPress}) {
  return (
    <Col alignItems="center" p="25px" mt="15px">
      <Row mb="30px">
        <Text fontSize="24px" textAlign="center">
          Você ainda não favoritou
          {'\n'}
          nenhum imóvel
        </Text>
      </Row>
      <Row mb="30px">
        <Image
          source={require('@/assets/img/icons/heart_plus.png')}
          style={{width: 70, height: 70}}
        />
      </Row>
      <Row mb="25px">
        <Text color="grey">
          Navegue pelos nosso imóveis e dê um coração para os que você mais
          gostar. Esses imóveis ficarão salvos aqui nessa lista para você ver e
          rever quando quiser.
        </Text>
      </Row>
      <Row>
        <Button fluid active height="tall" onPress={onPress}>
          Explorar
        </Button>
      </Row>
    </Col>
  )
}
