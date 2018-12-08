import _ from 'lodash'
import {PureComponent} from 'react'
import {Animated} from 'react-native'
import {View, Row, Text, Icon} from '@emcasa/ui-native'
import styled from 'styled-components/native'

const Bullet = styled(function PaginationBullet({value, style, ...props}) {
  const scale = value.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 1]
  })
  const animation = {transform: [{scale: scale}]}
  return (
    <Animated.View style={[style, animation]} {...props}>
      <Icon type="solid" name="circle" color="white" size={10} />
    </Animated.View>
  )
})`
  display: flex;
  width: 13;
  height: 13;
  justify-content: center;
  align-items: center;
`

const TextContainer = styled(View)`
  display: flex;
  position: absolute;
  height: 30;
  top: 0;
  left: 15;
  justify-content: center;
  align-items: center;
`

export default class GalleryPagination extends PureComponent {
  static defaultProps = {
    maxLength: 11
  }

  state = {
    length: undefined,
    scale: []
  }

  get cappedPosition() {
    const {index, totalPages} = this.props
    const {length} = this.state
    const {max, min, floor} = Math
    return max(length - (totalPages - index), min(index, floor(length / 2)))
  }

  calculateLayout() {
    const {length} = this.state
    const position = this.cappedPosition
    let layout = []
    for (let i = 0; i < length; ++i)
      layout[i] = 1 / (Math.abs(position - i) + 1)
    return layout
  }

  updateLayout(animate = true) {
    this.calculateLayout().forEach((scale, index) => {
      const value = this.state.scale[index]
      value.stopAnimation()
      if (!animate) value.setValue(scale)
      else
        Animated.timing(value, {
          toValue: scale,
          duration: 200,
          useNativeDriver: true
        }).start()
    })
  }

  static getDerivedStateFromProps({totalPages, maxLength}, state) {
    const nextState = {...state, length: Math.min(totalPages, maxLength)}
    if (state.length !== nextState.length)
      for (let i = 0; i < nextState.length; ++i)
        nextState.scale[i] = new Animated.Value(0)
    return nextState
  }

  componentDidMount() {
    this.updateLayout(false)
  }

  componentDidUpdate(prev) {
    if (prev.index !== this.props.index) this.updateLayout()
  }

  renderIcon = (index) => {
    return <Bullet key={index} value={this.state.scale[index]} />
  }

  render() {
    const {displayText, index, totalPages} = this.props
    const {length} = this.state
    return (
      <Row
        justifyContent="center"
        alignItems="center"
        width="100%"
        height="30px"
      >
        {displayText && (
          <TextContainer>
            <Text color="white" fontSize="small" fontWeight="500">
              {index + 1} / {totalPages}
            </Text>
          </TextContainer>
        )}
        {_.times(length, this.renderIcon)}
      </Row>
    )
  }
}
