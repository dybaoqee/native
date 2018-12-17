import {Component} from 'react'
import * as Final from 'react-final-form'
import {Input} from '@emcasa/ui-native'

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

const Name = () => (
  <Final.Field name="name" validate={validateName}>
    {({input: {onChange, ...input}, meta: {touched, error}}) => (
      <Input
        hideLabelView
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
    const fields = [<Name key="name" />]
    if (type === 3) fields.push(<Email key="email" />)
    if (type !== 3 || type === 5) fields.push(<Phone key="phone" />)
    // if (type === 2) fields.push(<Time name="time" />)
    if (type === 3) fields.push(<Message key="message" />)
    return fields
  }
}
