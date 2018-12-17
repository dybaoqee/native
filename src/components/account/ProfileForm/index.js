import {PureComponent} from 'react'
import * as Final from 'react-final-form'
import {Col, Input} from '@emcasa/ui-native'
import composeValidations, * as validations from '@/lib/validations'

const validatePhone = composeValidations(
  validations.required('O telefone é obrigatório'),
  validations.phone()
)
const validateName = validations.required('O nome é obrigatório')
const validateEmail = validations.email()

export default class ProfileForm extends PureComponent {
  static defaultProps = {
    fields: {name: true, email: true, phone: true}
  }

  render() {
    const {onChange, onSubmit, initialValues, fields, ...props} = this.props

    return (
      <Final.Form initialValues={initialValues} onSubmit={onSubmit}>
        {({form}) => (
          <Col flex={1} {...props}>
            {fields.name && (
              <Final.Field name="name" validate={validateName}>
                {({input: {onChange, ...input}, meta: {touched, error}}) => (
                  <Input
                    {...input}
                    hideLabelView
                    error={touched && error}
                    autoCapitalize="words"
                    placeholder="Nome"
                    onChangeText={onChange}
                    onSubmitEditing={() => form.focus('email')}
                  />
                )}
              </Final.Field>
            )}
            {fields.email && (
              <Final.Field name="email" validate={validateEmail}>
                {({input: {onChange, ...input}, meta: {touched, error}}) => (
                  <Input
                    {...input}
                    hideLabelView
                    error={touched && error}
                    autoCapitalize="none"
                    placeholder="Email"
                    keyboardType="email-address"
                    onChangeText={onChange}
                  />
                )}
              </Final.Field>
            )}
            {fields.phone && (
              <Final.Field name="phone" validate={validatePhone}>
                {({input: {onChange, ...input}, meta: {touched, error}}) => (
                  <Input
                    {...input}
                    disabled
                    hideLabelView
                    error={touched && error}
                    editable={false}
                    placeholder="Telefone (obrigatório)"
                    keyboardType="phone-pad"
                    onChangeText={onChange}
                  />
                )}
              </Final.Field>
            )}
            <Final.FormSpy
              subscription={{values: true, pristine: true, valid: true}}
              onChange={(state) => onChange(state)}
            />
          </Col>
        )}
      </Final.Form>
    )
  }
}
