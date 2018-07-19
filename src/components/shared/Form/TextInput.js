import _ from 'lodash'
import React, {PureComponent} from 'react'

import TextInput from '@/components/shared/TextInput'
import {field} from './Field'

@field()
export default class TextInputField extends PureComponent {
  static defaultProps = {
    value: ''
  }

  state = {
    defaultValue: undefined
  }

  input = React.createRef()

  static getDerivedStateFromProps(props, {defaultValue}) {
    if (typeof defaultValue === 'undefined') return {defaultValue: props.value}
    else return null
  }

  componentDidUpdate(prev) {
    const {focus} = this.props
    const input = this.input.current
    if (focus && !prev.focus && input && !input.isFocused()) input.focus()
  }

  onSubmit = () => {
    const {returnKeyType, nextField, onSubmit, onFocusField} = this.props
    switch (returnKeyType) {
      case 'next':
        onFocusField(nextField)
        break
      case 'done':
        onSubmit()
        break
    }
  }

  render() {
    const {onChange, valid, ...props} = this.props
    const {defaultValue} = this.state
    delete props.value
    return (
      <TextInput
        {...props}
        accessible
        accessibilityLabel={props.placeholder}
        defaultValue={defaultValue}
        invalid={!valid}
        inputRef={this.input}
        onChangeText={onChange}
        onSubmitEditing={this.onSubmit}
      />
    )
  }
}
