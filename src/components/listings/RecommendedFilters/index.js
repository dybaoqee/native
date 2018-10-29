import {PureComponent} from 'react'
import {
  Dimensions,
  PixelRatio,
  ImageBackground,
  TouchableOpacity
} from 'react-native'
import styled from 'styled-components'
import Carousel from 'react-native-snap-carousel'
import {Text} from '@emcasa/ui-native'

const Neighborhood = styled(function NeighborhoodCard({
  label,
  onPress,
  ...props
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <ImageBackground {...props}>
        <Text color="pink" fontSize={14}>
          {label}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  )
})`
  align-items: center;
  justify-content: center;
  padding: 5px;
  width: ${({width}) => parseInt(width) - 10}px;
  height: ${({height}) => parseInt(height) - 10}px;
`

export default class RecommendedNeighborhoods extends PureComponent {
  state = {}

  static getDerivedStateFromProps({width}) {
    return {
      itemWidth: PixelRatio.roundToNearestPixel(width * 0.4),
      itemHeight: PixelRatio.roundToNearestPixel(width * 0.4 * 0.64)
    }
  }

  renderItem = ({item}) => {
    const {onChange} = this.props
    const {itemWidth, itemHeight} = this.state
    return (
      <Neighborhood
        {...item}
        width={itemWidth}
        height={itemHeight}
        onPress={() => onChange({neighborhoods: [item.value]})}
      />
    )
  }

  render() {
    const {style, width, data} = this.props
    const {itemWidth, itemHeight} = this.state
    return (
      <Carousel
        enableMomentum
        inactiveSlideOpacity={0.8}
        inactiveSlideScale={1}
        activeSlideAlignment={'start'}
        containerCustomStyle={style}
        sliderWidth={width}
        renderItem={this.renderItem}
        itemWidth={itemWidth}
        itemHeight={itemHeight}
        data={data}
      />
    )
  }
}

RecommendedNeighborhoods.defaultProps = {
  get width() {
    return Dimensions.get('window').width
  }
}
