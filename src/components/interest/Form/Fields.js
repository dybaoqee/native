import styled from 'styled-components/native'
import * as Final from 'react-final-form'
import {View, Input} from '@emcasa/ui-native'

export const Field = styled(({style, ...props}) => (
  <View style={style}>
    <Final.Field {...props} />
  </View>
))`
  margin-bottom: 20px;
`

const Name = () => (
  <Field name="name">
    {({input: {value, onChange}}) => (
      <Input
        value={value}
        onChange={onChange}
        autoCapitalize="words"
        autoCorrect={false}
        placeholder="Nome"
      />
    )}
  </Field>
)

const Email = () => (
  <Field name="email">
    {({input: {value, onChange}}) => (
      <Input
        value={value}
        onChange={onChange}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        placeholder="Email"
      />
    )}
  </Field>
)

const Phone = () => (
  <Field name="phone">
    {({input: {value, onChange}}) => (
      <Input
        value={value}
        onChange={onChange}
        keyboardType="phone-pad"
        placeholder="Telefone"
      />
    )}
  </Field>
)

const Message = () => (
  <Field name="message">
    {({input: {value, onChange}}) => (
      <Input
        area
        value={value}
        onChange={onChange}
        placeholder="Mensagem (Opcional)"
        height="150px"
      />
    )}
  </Field>
)

export default function InterestFormFields({type}) {
  const fields = [<Name key="name" />]
  if (type === 3) fields.push(<Email key="email" />)
  if (type !== 3 || type === 5) fields.push(<Phone key="phone" />)
  // if (type === 2) fields.push(<Time name="time" />)
  if (type === 3) fields.push(<Message key="message" />)
  return fields
}
