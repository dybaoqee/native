import {PureComponent} from 'react'
import {
  Dimensions,
  PixelRatio,
  ImageBackground,
  TouchableOpacity
} from 'react-native'
import styled from 'styled-components'
import Carousel from 'react-native-snap-carousel'
import LinearGradient from 'react-native-linear-gradient'
import {View, Text} from '@emcasa/ui-native'

const IMAGE_PADDING_BOTTOM = 10
const IMAGE_PADDING_TOP = 5

const Neighborhood = styled(function NeighborhoodCard({
  style,
  source,
  label,
  onPress,
  ...props
}) {
  const width = parseInt(props.width) - 10
  const height = parseInt(props.height) - 10
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
      <View
        style={{borderRadius: 5, width, height}}
        elevation={5}
        mt={`${IMAGE_PADDING_TOP}px`}
        mb={`${IMAGE_PADDING_BOTTOM}px`}
        bg="pink"
      >
        <ImageBackground source={source} style={[style, {width, height}]}>
          <Text color="white" fontSize={14}>
            {label}
          </Text>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  )
})`
  align-items: center;
  justify-content: center;
  padding: 5px;
  border-radius: 5px;
  overflow: hidden;
`

const GradientOverlay = styled(LinearGradient).attrs({
  colors: ['rgba(255,255,255,0)', 'white'],
  locations: [0.8, 1],
  start: {x: 0, y: 0},
  end: {x: 1, y: 0},
  pointerEvents: 'none'
})`
  z-index: 1;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`

export default class RecommendedNeighborhoods extends PureComponent {
  state = {}

  static getDerivedStateFromProps({width}) {
    return {
      itemWidth: PixelRatio.roundToNearestPixel(width * 0.4),
      itemHeight: PixelRatio.roundToNearestPixel(width * 0.4 * 0.55)
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
      <View>
        <GradientOverlay />
        <Carousel
          enableMomentum
          inactiveSlideOpacity={0.8}
          inactiveSlideScale={1}
          activeSlideAlignment={'start'}
          containerCustomStyle={{paddingLeft: 15}}
          sliderWidth={width}
          renderItem={this.renderItem}
          itemWidth={itemWidth}
          itemHeight={itemHeight + IMAGE_PADDING_TOP + IMAGE_PADDING_BOTTOM}
          data={data}
        />
      </View>
    )
  }
}

RecommendedNeighborhoods.defaultProps = {
  get width() {
    return Dimensions.get('window').width
  }
}
