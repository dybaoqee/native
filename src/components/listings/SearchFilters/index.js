import {range, isEqual} from 'lodash'
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
  value !== null ? {min: value, max: undefined} : undefined
const formatRange = (value) => (value ? value.min : null)

const compareArray = (a, b) => isEqual((a || []).sort(), (b || []).sort())

const nullableSelectStrategy = {
  isSelected: (selectedValue, value) => selectedValue == value,
  update: (selectedValue, value) => (selectedValue == value ? null : value)
}

function ButtonRange({value, min = 0, max, emptyLabel = '0', ...props}) {
  return (
    <Button.Group
      strategy={nullableSelectStrategy}
      flexDirection="row"
      selectedValue={value}
      {...props}
    >
      {min == 0 && <Option value={0}>{emptyLabel}</Option>}
      {range(1, max).map((num) => (
        <Option key={num} value={num}>
          {num}
        </Option>
      ))}
      <Option value={max}>+</Option>
    </Button.Group>
  )
}

export default function SearchFilters({onChange, initialValues}) {
  return (
    <Final.Form
      initialValues={{
        rooms: null,
        garageSpots: null,
        ...initialValues
      }}
      onSubmit={() => null}
    >
      {() => (
        <View pr="20px" pl="20px">
          <Label>Tipo de Imóvel</Label>
          <Field name="types" isEqual={compareArray}>
            {({input}) => (
              <Button.Group
                strategy="multi"
                flexDirection="row"
                selectedValue={input.value ? [].concat(input.value) : []}
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
            {({input}) => <ButtonRange {...input} min={1} max={5} />}
          </Field>
          <Label>Suítes</Label>
          <Field
            allowNull
            name="suites"
            parse={parseRange}
            format={formatRange}
          >
            {({input}) => (
              <ButtonRange {...input} min={0} max={4} emptyLabel="Sem suíte" />
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
              <ButtonRange {...input} min={0} max={4} emptyLabel="Sem vaga" />
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
