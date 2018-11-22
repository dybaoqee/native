import {isObject} from 'lodash'
import React, {PureComponent} from 'react'
import {View, Keyboard, KeyboardAvoidingView, Platform} from 'react-native'

import BottomTabs from './BottomTabs'

export default class Shell extends PureComponent {
  static defaultProps = {
    bottomTabs: false,
    behavior: 'padding'
  }

  state = {
    keyboardVisible: false,
    offset: 80
  }

  keyboardAvoidingView = React.createRef()

  keyboardListeners = []

  componentDidMount() {
    if (Platform.OS === 'ios') {
      this.keyboardListeners.push(
        Keyboard.addListener('keyboardDidHide', this.onKeyboardHide),
        Keyboard.addListener('keyboardDidShow', this.onKeyboardShow)
      )
    }
  }

  componentWillUnmount() {
    this.keyboardListeners.map((listener) => listener.remove())
    this.keyboardListeners = []
  }

  onLayout = ({nativeEvent: {layout}}) =>
    this.setState({layout: {height: layout.height}})

  onKeyboardHide = () => {
    // Reset KeyboardAvoidingView padding when keyboard is hidden
    if (this.keyboardAvoidingView.current)
      this.keyboardAvoidingView.current._onKeyboardChange()
    this.setState({keyboardHeight: 0})
  }

  onKeyboardShow = (e) => {
    this.setState({
      keyboardHeight: e.endCoordinates.height
    })
  }

  render() {
    const {style, children, testID, behavior, bottomTabs} = this.props
    const {offset, layout, keyboardVisible, keyboardHeight} = this.state
    const bottomTabProps = typeof bottomTabs === 'object' ? bottomTabs : {}
    const layoutInfo = {
      hasBottomTabs: Boolean(bottomTabs)
    }
    return (
      <View
        testID={testID}
        style={[{flex: 1}, layout]}
        onLayout={this.onLayout}
      >
        <KeyboardAvoidingView
          ref={this.keyboardAvoidingView}
          style={[{flex: 1}, style, !keyboardVisible && layout]}
          keyboardVerticalOffset={offset}
          behavior={behavior !== 'none' ? behavior : undefined}
          enabled={Platform.OS !== 'android' && behavior !== 'none'}
        >
          <View style={{flex: 1, display: 'flex'}}>
            {React.Children.map(
              children,
              (node) =>
                React.isValidElement(node)
                  ? React.cloneElement(node, layoutInfo)
                  : node
            )}
          </View>
        </KeyboardAvoidingView>
        {layoutInfo.hasBottomTabs && (
          <BottomTabs
            bottom={keyboardHeight}
            testID="bottom_tabs"
            {...bottomTabProps}
          />
        )}
      </View>
    )
  }
}
