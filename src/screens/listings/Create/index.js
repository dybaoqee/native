import {PureComponent} from 'react'
import {Linking} from 'react-native'
import {Navigation} from 'react-native-navigation'
import {Text, Row, Button} from '@emcasa/ui-native'

import {FRONTEND_URL} from '@/config/const'
import {Modal, Body} from '@/components/layout'

export default class createListingScreen extends PureComponent {
  static screenName = 'listings.Create'

  static options = {
    layout: {
      backgroundColor: 'transparent'
    },
    screenBackgroundColor: 'transparent',
    modalPresentationStyle: 'overCurrentContext'
  }

  onDismiss = () => Navigation.dismissAllModals()

  onOpenUrl = () => {
    const url = `${FRONTEND_URL}/saiba-mais-para-vender`
    Linking.canOpenURL(url).then((supported) => {
      if (supported) Linking.openURL(url)
    })
  }

  render() {
    return (
      <Modal bg="pink" opacity={0.9}>
        <Modal.Header onDismiss={this.onDismiss} />
        <Body
          ml="20px"
          mr="20px"
          flex={1}
          alignItems="center"
          justifyContent="center"
        >
          <Row mb="25px">
            <Text
              color="white"
              fontSize={24}
              textAlign="center"
              fontWeight="500"
            >
              Quer anunciar seu imóvel aqui na EmCasa?
            </Text>
          </Row>
          <Row mb="75px">
            <Text color="white" fontSize={18} lineHeight={25}>
              Vamos te redirecionar para o nosso site para você anuniar o seu
              imóvel, tá ok?
            </Text>
          </Row>
          <Row>
            <Button fluid height="tall" onPress={this.onOpenUrl}>
              Começar
            </Button>
          </Row>
        </Body>
      </Modal>
    )
  }
}
