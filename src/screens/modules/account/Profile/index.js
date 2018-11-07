import React, {PureComponent, Fragment} from 'react'
import {Dimensions} from 'react-native'
import {connect} from 'react-redux'
import {View, Row, Col, Button, Text, Icon} from '@emcasa/ui-native'

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

  onEditProfile = () => this.setState({isEditing: true, message: undefined})

  onCancelEditing = () => this.setState({isEditing: false, message: undefined})

  onSuccess = (hasChanges) =>
    this.setState({
      isEditing: false,
      message: hasChanges && {
        key: Date.now(),
        icon: 'check-circle',
        color: 'green',
        text: 'Informações salvas com sucesso'
      }
    })

  onError = (error) =>
    this.setState({
      isEditing: false,
      message: {
        key: Date.now(),
        icon: 'times-circle',
        color: 'red',
        text: error.message
      }
    })

  onSignOut = async () => {
    const {signOut, updateStackRoot} = this.props
    await signOut()
    updateStackRoot()
  }

  renderMessage() {
    const {message} = this.state
    return (
      <Row height="20px" flex={1} alignItems="center" justifyContent="center">
        {Boolean(message) && (
          <Fragment>
            <Col mr="2.5px">
              <Icon name={message.icon} color={message.color} size={18} />
            </Col>
            <Col>
              <Text color={message.color} fontSize={16} textAlign="center">
                {message.text}
              </Text>
            </Col>
          </Fragment>
        )}
      </Row>
    )
  }

  renderProfileForm() {
    return (
      <View flex={1}>
        <ProfileForm
          ref={this.formRef}
          onSuccess={this.onSuccess}
          onError={this.onError}
          onChange={this.onChange}
          onCancel={this.onCancelEditing}
        />
        {this.renderMessage()}
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
        <Row height="30px">{this.renderMessage()}</Row>
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
        <Body scroll bounces={false} mb="auto" height="auto">
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
