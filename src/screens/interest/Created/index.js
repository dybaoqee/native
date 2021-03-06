import {PureComponent} from 'react'
import {Row, Text} from '@emcasa/ui-native'

import {Body, Modal} from '@/components/layout'

export default class InterestCreatedModal extends PureComponent {
  static screenName = 'interest.Created'

  static options = {
    statusBar: {
      style: 'light',
      backgroundColor: 'transparent'
    }
  }

  render() {
    return (
      <Modal bg="pink" testID="@interest.Created">
        <Modal.Header color="white" onDismiss={this.props.onDismiss} />
        <Body flex={1} p="25px">
          <Row mb="25px" justifyContent="center">
            <Text color="white" fontSize={24} textAlign="center">
              Notificação Enviada
            </Text>
          </Row>
          <Row flex={1} alignItems="center">
            <Text color="white" fontSize={18} textAlign="center">
              Entraremos em contato o mais rápido possível para agendarmos uma
              visita!
            </Text>
          </Row>
        </Body>
      </Modal>
    )
  }
}
