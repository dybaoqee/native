import React, {PureComponent} from 'react'
import {Modal, Animated, Easing, Dimensions} from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import styled from 'styled-components'
import {View} from '@emcasa/ui-native'

import {withAnimation} from '@/components/shared/Animation'

const Body = withAnimation(
  {
    lazy: true,
    useNativeDriver: true,
    easing: Easing.out(Easing.exp),
    timeout: 500
  },
  ({value}) => ({
    style: {
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
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
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
        animationType="fade"
        {...props}
        visible={modalVisible}
        style={{width: '100%', height: '100%'}}
      >
        <SafeAreaView style={{flex: 1}}>
          <View style={{position: 'relative', flex: 1}}>
            <Body in={bodyVisible} onExitEnd={this.onExitEnd}>
              {children}
            </Body>
            {React.cloneElement(bottomTabs, {
              shadow: true,
              zIndex: 1
            })}
          </View>
        </SafeAreaView>
      </Modal>
    )
  }
}
