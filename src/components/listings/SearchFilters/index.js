import {Component} from 'react'
import {range, isEqual} from 'lodash'
import styled, {withTheme} from 'styled-components/native'
import {themeGet, width, height} from 'styled-system'
import {View, Text, Button, Slider as BaseSlider} from '@emcasa/ui-native'
import * as Final from 'react-final-form'
import {compose, mapProps} from 'recompose'

import * as format from '@/config/formatting'
import Tooltip from '@/components/shared/Tooltip'
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
  update: (selectedValue, value) =>
    compareRange(selectedValue, value) ? null : value
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

const SliderLabelText = styled(({style, width, height, ...props}) => (
  <View style={style} width={width} height={height}>
    <Text {...props} />
  </View>
)).attrs({
  textAlign: 'center',
  color: 'white',
  fontSize: 'small'
})`
  position: absolute;
  z-index: 1;
  top: 2.5px;
  justify-content: center;
  align-items: center;
  position: absolute;
  ${width};
  ${height};
`

const SliderLabel = styled(function Sliderlabel({
  children,
  width,
  height,
  ...props
}) {
  return (
    <View width={width} height={height} {...props}>
      <SliderLabelText width={width} height={height}>
        {children}
      </SliderLabelText>
      <Tooltip
        style={{position: 'absolute'}}
        bg="pink"
        border="1px"
        borderColor="white"
        height={height}
        width={width}
        tipHeight={5}
      />
    </View>
  )
}).attrs({
  width: 60,
  height: 24
})`
  margin-bottom: 10px;
  margin-left: -${({width}) => width / 2}px;
`

const Slider = styled(BaseSlider).attrs({
  height: 'medium',
  width: ({theme}) => theme.dimensions.window.width - 62
})`
  margin-top: ${themeGet('space.4')}px;
`

class SliderRangeField extends Component {
  static defaultProps = {
    round: 1
  }

  shouldComponentUpdate() {
    return false
  }

  parseValue = (value) => {
    const {round} = this.props
    return (value / round).toFixed(0) * round
  }

  parseRange = ({min, max}) => {
    if (min == this.props.min && max == this.props.max) return undefined
    return {
      min: this.parseValue(min),
      max: this.parseValue(max)
    }
  }

  renderLabel = ({value}) => {
    return this.props.renderLabel({value: this.parseValue(value)})
  }

  render() {
    const {min, max, ...props} = this.props
    return (
      <View style={{marginHorizontal: 12}}>
        <Field
          allowNull
          isEqual={compareRange}
          parse={this.parseRange}
          slideEventThrottle={100}
          {...props}
        >
          {({input}) => (
            <Slider
              range={[min, max]}
              initialValue={input.value || defaultInitialValues[props.name]}
              trackProps={{height: 1, bg: 'white'}}
              onChange={input.onChange}
            >
              <Slider.Marker
                bg="white"
                name="min"
                renderLabel={this.renderLabel}
              />
              <Slider.Marker
                bg="white"
                name="max"
                trackProps={{height: 3}}
                renderLabel={this.renderLabel}
              />
            </Slider>
          )}
        </Field>
      </View>
    )
  }
}

const defaultInitialValues = {
  price: {min: 250000, max: 12000000},
  area: {min: 35, max: 500}
}

export default function SearchFilters({onChange, initialValues}) {
  return (
    <Final.Form
      initialValues={{
        ...initialValues
      }}
      onSubmit={() => null}
    >
      {() => (
        <View pr="20px" pl="20px">
          <Label>Área</Label>
          <SliderRangeField
            name="area"
            min={defaultInitialValues.area.min}
            max={defaultInitialValues.area.max}
            renderLabel={({value}) => (
              <SliderLabel>
                {format.number(value.toFixed(0))}
                m²
              </SliderLabel>
            )}
          />
          <Label>Valor</Label>
          <SliderRangeField
            name="price"
            round={1000}
            min={defaultInitialValues.price.min}
            max={defaultInitialValues.price.max}
            renderLabel={({value}) => (
              <SliderLabel>
                R$
                {format.abbrevPrice(value.toFixed(0))}
              </SliderLabel>
            )}
          />
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
            onChange={onChange}
          />
        </View>
      )}
    </Final.Form>
  )
}
