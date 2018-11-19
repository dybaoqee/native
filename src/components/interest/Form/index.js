import {Component} from 'react'
import {View, Text, Dropdown} from '@emcasa/ui-native'

import Form from '@/components/shared/Form'
import Fields from './Fields'

export default class InterestForm extends Component {
  state = {
    activeType: undefined
  }

  onChangeType = (id) => this.setState({activeType: id})

  render() {
    const {interestTypes, ...props} = this.props
    const {activeType} = this.state

    return (
      <Form {...props}>
        <View p="15px">
          <Text>Escolha a melhor forma para agendar sua visita</Text>
          <Dropdown
            height="tall"
            selectedValue={this.state.activeType}
            onChange={this.onChangeType}
            placeholder="Como fazemos?"
          >
            {interestTypes.map(({id, name}) => (
              <Dropdown.Option key={id} value={id}>
                {name}
              </Dropdown.Option>
            ))}
          </Dropdown>
          {activeType && <Fields type={activeType} />}
        </View>
      </Form>
    )
  }
}
