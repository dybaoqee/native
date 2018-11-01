import {range, isEqual, isArray} from 'lodash'
import styled, {withTheme} from 'styled-components/native'
import {View, Text, Button} from '@emcasa/ui-native'
import * as Final from 'react-final-form'
import {compose, mapProps} from 'recompose'
import GhostButton from '@/components/shared/GhostButton'

const Option = compose(
  withTheme,
  mapProps(({active, theme, ...props}) => ({
    ...props,
    active,
    mr: '10px',
    pr: '13px',
    pl: '13px',
    height: 'tall',
    color: active ? theme.colors.dark : 'white',
    style: {
      backgroundColor: active ? 'white' : 'transparent'
    }
  }))
)(GhostButton)

const Label = styled(Text)`
  font-weight: 500;
  font-size: 17;
  margin-bottom: 10px;
  color: white;
`

const Field = styled(({style, ...props}) => (
  <View style={style}>
    <Final.Field {...props} />
  </View>
))`
  margin-bottom: 20px;
`

const parseRange = (value) =>
  value !== null ? {min: 0, max: value} : undefined
const formatRange = (value) => (value ? value.max : null)

const compareArray = (a, b) => isEqual((a || []).sort(), (b || []).sort())

export default function SearchFilters({onChange, initialValues}) {
  return (
    <Final.Form initialValues={initialValues} onSubmit={() => null}>
      {() => (
        <View pr="20px" pl="20px">
          <Label>Tipo de Imóvel</Label>
          <Field name="types" isEqual={compareArray}>
            {({input}) => (
              <Button.Group
                strategy="multi"
                flexDirection="row"
                selectedValue={input.value}
                {...input}
              >
                <Option value="Casa">Casa</Option>
                <Option value="Apartamento">Apto</Option>
                <Option value="Cobertura">Cobertura</Option>
              </Button.Group>
            )}
          </Field>
          <Label>Quartos</Label>
          <Field allowNull name="rooms" parse={parseRange} format={formatRange}>
            {({input}) => (
              <Button.Group
                flexDirection="row"
                selectedValue={input.value}
                {...input}
              >
                {range(1, 5).map((num) => (
                  <Option key={num} value={num}>
                    {num}
                  </Option>
                ))}
                <Option value={null}>+</Option>
              </Button.Group>
            )}
          </Field>
          <Label>Vagas de Garagem</Label>
          <Field
            allowNull
            name="garageSpots"
            parse={parseRange}
            format={formatRange}
          >
            {({input}) => (
              <Button.Group
                flexDirection="row"
                selectedValue={input.value}
                {...input}
              >
                <Option value={0}>Sem vaga</Option>
                {range(1, 4).map((num) => (
                  <Option key={num} value={num}>
                    {num}
                  </Option>
                ))}
                <Option value={null}>+</Option>
              </Button.Group>
            )}
          </Field>
          <Final.FormSpy
            subscription={{values: true, pristine: true}}
            onChange={(state) => onChange(state)}
          />
        </View>
      )}
    </Final.Form>
  )
}
