import React, {PureComponent, Fragment} from 'react'
import {ScrollView, Dimensions} from 'react-native'
import {withTheme} from 'styled-components'
import {View, Row, Col, Button, Text, Icon} from '@emcasa/ui-native'

import Avatar from '@/components/account/Avatar'
import Profile from '@/components/account/Profile'
import ProfileForm from './Form'

class UserProfileTab extends PureComponent {
  state = {}

  formRef = React.createRef()

  componentDidUpdate(prevProps) {
    if (prevProps.tabIndex !== this.props.tabIndex) this.onCancelEditing()
  }

  get tabHeight() {
    const {dimensions, size, buttonHeight} = this.props.theme

    return (
      dimensions.layout.height -
      parseInt(size.bottomTabs) -
      parseInt(buttonHeight[1])
    )
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
          mb="15px"
          ref={this.formRef}
          onSuccess={this.onSuccess}
          onError={this.onError}
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
    const {user, onSignOut} = this.props
    return (
      <View flex={1}>
        <Row flex={1} mb="15px">
          <Profile user={user} />
        </Row>
        {this.renderMessage()}
        <Col>
          <Button active mb="15px" height="tall" onPress={this.onEditProfile}>
            Editar
          </Button>
          <Button height="tall" onPress={onSignOut}>
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
      <ScrollView
        bounces={false}
        style={{flex: 1}}
        contentContainerStyle={{minHeight: this.tabHeight}}
      >
        <Row
          style={{minHeight: 100}}
          mb="15px"
          height={Dimensions.get('window').height / 5}
          justifyContent="center"
          alignItems="flex-end"
        >
          <Avatar user={user} />
        </Row>
        <Row flex={1} mr="15px" ml="15px" mb="15px">
          {isEditing ? this.renderProfileForm() : this.renderProfile()}
        </Row>
      </ScrollView>
    )
  }
}

export default withTheme(UserProfileTab)
