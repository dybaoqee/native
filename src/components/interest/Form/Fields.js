import React, {Component} from 'react'
import * as Final from 'react-final-form'
import styled from 'styled-components/native'
import {View, Input, Button} from '@emcasa/ui-native'
import BaseDateTimePicker from 'react-native-modal-datetime-picker'

import {
  CALL_WITHIN_5_MINUTES,
  CALL_AT_SPECIFIC_TIME,
  CONTACT_BY_EMAIL,
  CONTACT_BY_WHATSAPP
} from './interestTypes'
import composeValidations, * as validations from '@/lib/validations'

const validatePhone = composeValidations(
  validations.required('O telefone é obrigatório'),
  validations.phone()
)
const validateName = validations.required('O nome é obrigatório')
const validateEmail = composeValidations(
  validations.required('O email é obrigatório.'),
  validations.email()
)
const validateTime = validations.required('O horário é obrigatório')

const Name = () => (
  <Final.Field name="name" validate={validateName}>
    {({input: {onChange, ...input}, meta: {touched, error}}) => (
      <Input
        hideLabelView
        accessible
        accessibilityLabel="Nome"
        error={touched && error}
        autoCapitalize="words"
        autoCorrect={false}
        placeholder="Nome"
        onChangeText={onChange}
        {...input}
      />
    )}
  </Final.Field>
)

const Email = () => (
  <Final.Field name="email" validate={validateEmail}>
    {({input: {onChange, ...input}, meta: {touched, error}}) => (
      <Input
        hideLabelView
        accessible
        accessibilityLabel="Email"
        error={touched && error}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        placeholder="Email"
        onChangeText={onChange}
        {...input}
      />
    )}
  </Final.Field>
)

const Phone = () => (
  <Final.Field name="phone" validate={validatePhone}>
    {({input: {onChange, ...input}, meta: {touched, error}}) => (
      <Input
        hideLabelView
        accessible
        accessibilityLabel="Telefone"
        error={touched && error}
        keyboardType="phone-pad"
        placeholder="Telefone"
        onChangeText={onChange}
        {...input}
      />
    )}
  </Final.Field>
)

const Message = () => (
  <Final.Field name="message">
    {({input: {value, onChange}}) => (
      <Input
        area
        hideLabelView
        value={value}
        onChangeText={onChange}
        placeholder="Mensagem (Opcional)"
        height="150px"
      />
    )}
  </Final.Field>
)

const DateTimePicker = styled(BaseDateTimePicker).attrs({
  cancelTextStyle: ({theme}) => ({color: theme.colors.pink}),
  confirmTextStyle: ({theme}) => ({color: theme.colors.pink})
})``

class Time extends Component {
  state = {value: undefined, modalVisible: false}

  fieldRef = React.createRef()

  shouldComponentUpdate(nextProps, nextState) {
    return nextState !== this.state
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.value !== this.state.value && this.fieldRef.current) {
      this.fieldRef.current.handlers.onChange(this.message)
    }
  }

  get message() {
    const {value} = this.state
    return value
      ? `Me ligue às ${value.getHours()}:${value.getMinutes()}h`
      : 'Escolha o horário'
  }

  onShowModal = () => this.setState({modalVisible: true})

  onHideModal = () => this.setState({modalVisible: false})

  onChange = (value) => this.setState({value, modalVisible: false})

  render() {
    return (
      <Final.Field ref={this.fieldRef} name="message" validate={validateTime}>
        {() => (
          <View>
            <Button active height="tall" onPress={this.onShowModal}>
              {this.message}
            </Button>
            <DateTimePicker
              mode="time"
              cancelTextIOS="Cancelar"
              confirmTextIOS="Confirmar"
              titleIOS="Escolha o horário"
              isVisible={this.state.modalVisible}
              onConfirm={this.onChange}
              onCancel={this.onHideModal}
            />
          </View>
        )}
      </Final.Field>
    )
  }
}

export default class InterestFormFields extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.type !== this.props.type
  }

  componentDidUpdate(prevProps) {
    if (prevProps.type !== this.props.type) {
      this.props.form.reset()
    }
  }

  render() {
    const {type} = this.props
    const fields = [<Name key="name" />, <Phone key="phone" />]
    if (type === CONTACT_BY_EMAIL) fields.push(<Email key="email" />)
    if (type === CALL_AT_SPECIFIC_TIME) fields.push(<Time key="time" />)
    if (type === CONTACT_BY_EMAIL) fields.push(<Message key="message" />)
    return fields
  }
}
