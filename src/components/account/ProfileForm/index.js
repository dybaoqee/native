import {PureComponent} from 'react'
import * as Final from 'react-final-form'
import {View, Col, Input} from '@emcasa/ui-native'
import composeValidations, * as validations from '@/lib/validations'

function Field({children, ...props}) {
  return (
    <Final.Field {...props}>
      {(field) => <View mb="15px">{children(field)}</View>}
    </Final.Field>
  )
}

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
              <Field name="name" validate={validateName}>
                {({input: {onChange, ...input}}) => (
                  <Input
                    {...input}
                    autoCapitalize="words"
                    placeholder="Nome"
                    onChangeText={onChange}
                    onSubmitEditing={() => form.focus('email')}
                  />
                )}
              </Field>
            )}
            {fields.email && (
              <Field name="email" validate={validateEmail}>
                {({input: {onChange, ...input}}) => (
                  <Input
                    {...input}
                    autoCapitalize="none"
                    placeholder="Email"
                    keyboardType="email-address"
                    onChangeText={onChange}
                  />
                )}
              </Field>
            )}
            {fields.phone && (
              <Field name="phone" validate={validatePhone}>
                {({input: {onChange, ...input}}) => (
                  <Input
                    {...input}
                    disabled
                    editable={false}
                    placeholder="Telefone (obrigatório)"
                    keyboardType="phone-pad"
                    onChangeText={onChange}
                  />
                )}
              </Field>
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
