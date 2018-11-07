import {PureComponent} from 'react'
import * as Final from 'react-final-form'
import {View, Col, Text, Input} from '@emcasa/ui-native'

function Field({children, ...props}) {
  return (
    <Final.Field {...props}>
      {(field) => <View mb="15px">{children(field)}</View>}
    </Final.Field>
  )
}

export default class ProfileForm extends PureComponent {
  isInputActive = (key) =>
    this.props.value[key] !== (this.props.user[key] || '')

  render() {
    const {onChange, onSubmit, initialValues} = this.props

    return (
      <Final.Form initialValues={initialValues} onSubmit={onSubmit}>
        {({form}) => (
          <Col flex={1}>
            <Field name="name">
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
            <Field name="email">
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
            <Field name="phone">
              {({onChange, ...input}) => (
                <Input
                  {...input}
                  disabled
                  placeholder="Telefone (obrigatório)"
                  keyboardType="phone-pad"
                  onChangeText={onChange}
                />
              )}
            </Field>
            <Final.FormSpy
              subscription={{values: true, pristine: true}}
              onChange={(state) => onChange(state)}
            />
          </Col>
        )}
      </Final.Form>
    )
  }
}
