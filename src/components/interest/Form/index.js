import {PureComponent} from 'react'
import * as Final from 'react-final-form'
import {View, Text, Dropdown} from '@emcasa/ui-native'
import Fields from './Fields'

export default class InterestForm extends PureComponent {
  state = {
    activeType: undefined
  }

  onChangeType = (id) => this.setState({activeType: id})

  render() {
    const {interestTypes, onSubmit, onChange} = this.props
    const {activeType} = this.state

    return (
      <Final.Form onSubmit={onSubmit}>
        {() => (
          <View p="15px">
            <View mb="25px">
              <Text fontSize={16} color="grey" textAlign="center">
                Escolha a melhor forma
                {'\n'}
                para agendar sua visita
              </Text>
            </View>
            <Final.Field name="interestType" parse={parseInt}>
              {({input}) => (
                <Dropdown
                  height="tall"
                  selectedValue={input.value || undefined}
                  onChange={(value) => {
                    input.onChange(value)
                    this.onChangeType(value)
                  }}
                  placeholder="Como fazemos?"
                >
                  {interestTypes.map(({id, name}) => (
                    <Dropdown.Option key={id} value={parseInt(id)}>
                      {name}
                    </Dropdown.Option>
                  ))}
                </Dropdown>
              )}
            </Final.Field>
            <View mt="20px">{activeType && <Fields type={activeType} />}</View>
            <Final.FormSpy
              subscription={{values: true, valid: true}}
              onChange={onChange}
            />
          </View>
        )}
      </Final.Form>
    )
  }
}
