import {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'
import {Row, Col, Button} from '@emcasa/ui-native'
import {withProvider} from '@/containers/Provider'

class AccountKitScreen extends PureComponent {
  render() {
    const {resolve} = this.props
    return (
      <Col
        height="100%"
        width="100%"
        justifyContent="center"
        alignItems="center"
        m="15px"
      >
        <Row mb="15px">
          <Button fluid onPress={() => resolve({token: 'test'})}>
            Login
          </Button>
        </Row>
        <Row mb="15px">
          <Button fluid onPress={() => resolve({token: undefined})}>
            Sign Up
          </Button>
        </Row>
        <Row>
          <Button
            fluid
            onPress={() => {
              Navigation.dismissAllModals()
              resolve()
            }}
          >
            Dismiss
          </Button>
        </Row>
      </Col>
    )
  }
}

export default withProvider(AccountKitScreen)
