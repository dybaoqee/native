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

const compareArray = (a, b) => isEqual((a || []).sort(), (b || []).sort())

const compareRange = (a, b) =>
  Boolean((!a && !b) || (a && b && a.min == b.min && a.max == b.max))

const nullableRangeSelectStrategy = {
  isSelected: compareRange,
  update: (selectedValue, value) => (selectedValue == value ? null : value)
}

function ButtonRange({value, min = 0, max, emptyLabel = '0', ...props}) {
  return (
    <Button.Group
      strategy={nullableRangeSelectStrategy}
      flexDirection="row"
      selectedValue={value}
      {...props}
    >
      {range(min, max).map((num) => (
        <Option key={num} value={{min: num, max: num}}>
          {num ? num : emptyLabel}
        </Option>
      ))}
      <Option value={{min: max, max: undefined}}>+</Option>
    </Button.Group>
  )
}

function ButtonRangeField({min, max, emptyLabel, ...props}) {
  return (
    <Field allowNull isEqual={compareRange} {...props}>
      {({input}) => (
        <ButtonRange min={min} max={max} emptyLabel={emptyLabel} {...input} />
      )}
    </Field>
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
          <ButtonRangeField name="rooms" min={1} max={5} />
          <Label>Suítes</Label>
          <ButtonRangeField
            name="suites"
            min={0}
            max={4}
            emptyLabel="Sem suíte"
          />
          <Label>Vagas de Garagem</Label>
          <ButtonRangeField
            name="garageSpots"
            min={0}
            max={4}
            emptyLabel="Sem vaga"
          />
          <Final.FormSpy
            subscription={{values: true, pristine: true}}
            onChange={(state) => onChange(state)}
          />
        </View>
      )}
    </Final.Form>
  )
}
