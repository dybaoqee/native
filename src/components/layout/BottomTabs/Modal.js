import React, {PureComponent} from 'react'
import {Modal} from 'react-native'
import styled from 'styled-components'
import {Animated, Easing, Dimensions} from 'react-native'

import {withAnimation} from '@/components/shared/Animation'

const Background = withAnimation(
  {
    lazy: true,
    useNativeDriver: true,
    easing: Easing.out(Easing.exp),
    timeout: 500
  },
  ({value}) => ({
    style: {
      opacity: value,
      transform: [
        {
          translateY: value.interpolate({
            inputRange: [0, 1],
            outputRange: [Dimensions.get('window').height - 100, 0]
          })
        }
      ]
    }
  })
)(styled(Animated.View)`
  z-index: 0;
  top: 0;
  left: 0;
  right: 0;
  flex: 1;
`)

export default class BottomTabsModal extends PureComponent {
  state = {
    modalVisible: false,
    bodyVisible: false
  }

  static getDerivedStateFromProps(props, state) {
    if (!state.modalVisible && props.visible) return {modalVisible: true}
    if (state.modalVisible && !props.visible) return {bodyVisible: false}
    return null
  }

  componentDidUpdate() {
    if (this.state.modalVisible && !this.state.bodyVisible)
      this.setState({bodyVisible: true})
  }

  onExitEnd = () => this.setState({modalVisible: false})

  render() {
    const {children, bottomTabs, ...props} = this.props
    const {modalVisible, bodyVisible} = this.state
    delete props.visible
    return (
      <Modal
        transparent
        presentationStyle="overFullScreen"
        animationType="none"
        {...props}
        visible={modalVisible}
      >
        <Background in={bodyVisible} onExitEnd={this.onExitEnd}>
          {children}
        </Background>
        {React.cloneElement(bottomTabs, {
          shadow: true,
          zIndex: 1
        })}
      </Modal>
    )
  }
}
