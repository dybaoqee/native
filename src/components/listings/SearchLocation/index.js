import {PureComponent} from 'react'
import styled from 'styled-components'
import {themeGet, zIndex} from 'styled-system'
import {Animated, Easing, Dimensions} from 'react-native'
import {View} from '@emcasa/ui-native'

import {withAnimation} from '@/components/shared/Animation'
import IconButton from '@/components/shared/IconButton'
import Form from './Form'

const Body = styled.View`
  position: absolute;
  bottom: ${themeGet('size.bottomTabs')};
  width: 100%;
  margin-horizontal: 30px;
  margin-bottom: 45px;
  padding: 30px;
  border-radius: 25px;
  background-color: rgba(60, 72, 88, 0.9);
`

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
  top: 0;
  flex: 1;
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.8);
`)

const Overlay = styled(View)`
  ${zIndex};
  position: absolute;
  overflow: hidden;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

export default class LocationSearch extends PureComponent {
  state = {
    visible: false,
    value: {}
  }

  onStart = () => this.setState({visible: true})

  onEnd = () => this.setState({visible: false})

  render() {
    const {zIndex, onDismiss} = this.props
    return (
      <Overlay
        zIndex={zIndex}
        pointerEvents={this.state.visible ? 'auto' : 'none'}
      >
        <Background
          in={this.props.visible}
          onEnterStart={this.onStart}
          onExitEnd={this.onEnd}
        >
          {this.state.visible && (
            <Body>
              <View alignItems="flex-end" mt={-10} mr={-10}>
                <IconButton
                  name="times"
                  type="light"
                  color="white"
                  onPress={onDismiss}
                />
              </View>
              <Form {...this.props} />
            </Body>
          )}
        </Background>
      </Overlay>
    )
  }
}
