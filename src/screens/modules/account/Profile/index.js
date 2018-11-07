import React, {PureComponent, Fragment} from 'react'
import {Dimensions} from 'react-native'
import {connect} from 'react-redux'
import {View, Row, Col, Button} from '@emcasa/ui-native'

import composeWithRef from '@/lib/composeWithRef'
import {updateStackRoot} from '@/screens/modules/navigation'
import {
  withUserListings,
  withSignOutMutation,
  withUserProfile
} from '@/graphql/containers'
import {Shell, Body} from '@/components/layout'
import Avatar from '@/components/account/Avatar'
import Profile from '@/components/account/Profile'
import ProfileForm from './Form'

class UserProfileScreen extends PureComponent {
  static screenName = 'account.Profile'

  static options = {
    topBar: {
      title: {text: 'Meu Perfil'}
    }
  }

  state = {}

  formRef = React.createRef()

  componentDidDisappear() {
    this.onCancelEditing()
  }

  hideMessage = () => this.setState({message: undefined})

  onEditProfile = () => this.setState({isEditing: true})

  onCancelEditing = () => this.setState({isEditing: false})

  onSubmit = (hasChanges) =>
    this.setState(
      {
        isEditing: false,
        message: hasChanges ? 'Informações salvas com sucesso' : undefined
      },
      () => setTimeout(this.hideMessage(), 5000)
    )

  onSignOut = async () => {
    const {signOut, updateStackRoot} = this.props
    await signOut()
    updateStackRoot()
  }

  renderProfileForm() {
    return (
      <View flex={1}>
        <ProfileForm
          ref={this.formRef}
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          onCancel={this.onCancelEditing}
        />
        <Row justifyContent="space-between">
          <Button height="tall" onPress={this.onCancelEditing}>
            Cancelar
          </Button>
          <Button
            active
            height="tall"
            onPress={() => this.formRef.current.onSubmit()}
          >
            Salvar
          </Button>
        </Row>
      </View>
    )
  }

  renderProfile() {
    const {user} = this.props
    return (
      <View flex={1}>
        <Row flex={1}>
          <Profile user={user} />
        </Row>
        <Col>
          <Button active mt="15px" height="tall" onPress={this.onEditProfile}>
            Editar
          </Button>
          <Button mt="15px" height="tall" onPress={this.onSignOut}>
            Sair
          </Button>
        </Col>
      </View>
    )
  }

  render() {
    const {user} = this.props
    const {isEditing} = this.state

    return (
      <Shell bottomTabs>
        <Body mb="auto">
          <Row
            height={Dimensions.get('window').height / 3.5}
            justifyContent="center"
            alignItems="flex-end"
          >
            <Avatar user={user} />
          </Row>
          <Row flex={1} m="25px" mb="15px">
            {isEditing ? this.renderProfileForm() : this.renderProfile()}
          </Row>
        </Body>
      </Shell>
    )
  }
}

export default composeWithRef(
  connect(
    null,
    {updateStackRoot}
  ),
  withSignOutMutation,
  withUserListings,
  withUserProfile
)(UserProfileScreen)
