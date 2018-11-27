import {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'
import {Row, Col, Button} from '@emcasa/ui-native'
import {encodeAccessToken} from '@emcasa/mock-server/lib/helpers/jwt'
import {withProvider} from '@/containers/Provider'

class AccountKitScreen extends PureComponent {
  render() {
    const {resolve} = this.props
    return (
      <Col
        testID="@mock.AccountKit"
        height="100%"
        width="100%"
        justifyContent="center"
        alignItems="center"
        p="15px"
      >
        <Row mb="15px">
          <Button
            accessible
            fluid
            height="tall"
            onPress={() =>
              resolve({
                token: encodeAccessToken({
                  name: 'John Doe',
                  email: 'johndoe@example.com',
                  phone: '+552199999999'
                })
              })
            }
          >
            Login
          </Button>
        </Row>
        <Row mb="15px">
          <Button
            accessible
            fluid
            height="tall"
            onPress={() =>
              resolve({
                token: encodeAccessToken({
                  name: '',
                  email: '',
                  phone: '+552199999999'
                })
              })
            }
          >
            Sign Up
          </Button>
        </Row>
        <Row>
          <Button
            accessible
            fluid
            height="tall"
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
