import {PureComponent} from 'react'
import {TouchableWithoutFeedback} from 'react-native'

export default class Touchable extends PureComponent {
  state = {active: false}

  onPressIn = () => this.setState({active: true})

  onPressOut = () => this.setState({active: false})

  onPress = () => this.props.onPressHandler(this.props)

  render() {
    const {children} = this.props
    return (
      <TouchableWithoutFeedback
        onPress={this.onPress}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
      >
        {children(this.state)}
      </TouchableWithoutFeedback>
    )
  }
}

const defaultOnPress = ({onPress}) => onPress()

export const touchable = (onPress = defaultOnPress) => (Target) => (props) => (
  <Touchable onPressHandler={onPress} {...props}>
    {(ctx) => <Target {...ctx} {...props} />}
  </Touchable>
)
