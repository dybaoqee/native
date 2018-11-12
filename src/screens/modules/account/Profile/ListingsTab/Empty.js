import {Image} from 'react-native'
import {Row, Col, Text, Button} from '@emcasa/ui-native'

export default function UserListingEmpty({onCreateListing}) {
  return (
    <Col alignItems="center" p="25px" mt="15px">
      <Row mb="30px">
        <Text fontSize="24px" textAlign="center">
          Você não tem nenhum
          {'\n'}
          imóvel anunciado
        </Text>
      </Row>
      <Row mb="30px">
        <Image
          source={require('@/assets/img/icons/sad_smartphone.png')}
          style={{width: 70, height: 70}}
        />
      </Row>
      <Row mb="25px">
        <Text color="grey">
          Quer anunciar seu imóvel aqui na EmCasa? Vamos te redirecionar para o
          nosso site para você anunciar o seu imóvel.
        </Text>
      </Row>
      <Row>
        <Button fluid active height="tall" onPress={onCreateListing}>
          Começar
        </Button>
      </Row>
    </Col>
  )
}
