import {PureComponent} from 'react'
import {Button} from '@emcasa/ui-native'

import composeWithRef from '@/lib/composeWithRef'
import {withEmailMutation, withProfileMutation} from '@/graphql/containers'
import {Modal, Body} from '@/components/layout'
import ProfileForm from '@/components/account/ProfileForm'

class SignUpScreen extends PureComponent {
  static screenName = 'auth.SignUp'

  static options = {
    topBar: {
      title: {text: 'Cadastre-se'}
    }
  }

  state = {
    loading: false,
    valid: false,
    values: {}
  }

  onChange = (state) => this.setState(state)

  onSubmit = async () => {
    const {editUserProfile, changeEmail, onSuccess} = this.props
    const {
      values: {name, email},
      loading,
      valid
    } = this.state
    if (loading || !valid) return
    this.setState({loading: true, error: undefined})
    try {
      if (email) await changeEmail({email})
      await editUserProfile({name})
      this.setState({loading: false}, onSuccess)
    } catch (error) {
      this.setState({loading: false, error})
    }
  }

  render() {
    const {loading, valid} = this.state
    const disabled = Boolean(loading || !valid)
    return (
      <Modal testID="@auth.SignUp" bg="white">
        <Modal.Header color="dark" mt="15px" textAlign="center">
          Cadastre-se
        </Modal.Header>
        <Body loading={loading} m="15px">
          <ProfileForm
            fields={{name: true, email: true}}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
          />
          <Button
            disabled={disabled}
            active={!disabled}
            height="tall"
            onPress={disabled ? undefined : this.onSubmit}
          >
            {loading ? 'Salvando...' : 'Salvar'}
          </Button>
        </Body>
      </Modal>
    )
  }
}

export default composeWithRef(withEmailMutation, withProfileMutation)(
  SignUpScreen
)
