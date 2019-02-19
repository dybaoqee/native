import {PureComponent} from 'react'
import {
  Dimensions,
  PixelRatio,
  ImageBackground,
  TouchableOpacity
} from 'react-native'
import styled from 'styled-components'
import Carousel from 'react-native-snap-carousel'
import {View, Text} from '@emcasa/ui-native'
import GradientOverlay from '@/components/shared/GradientOverlay'

const IMAGE_PADDING_BOTTOM = 10
const IMAGE_PADDING_TOP = 5

const ComingSoon = styled(function ComingSoon({style}) {
  return (
    <View style={style} bg="pink">
      <Text color="white" fontSize="9px">
        Em breve
      </Text>
    </View>
  )
})`
  z-index: 1;
  flex: 1;
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 10px;
  border-radius: 4px;
  padding-vertical: 2px;
  padding-horizontal: 5px;
`

const Neighborhood = styled(function NeighborhoodCard({
  disabled,
  style,
  source,
  label,
  onPress,
  ...props
}) {
  const width = parseInt(props.width) - 10
  const height = parseInt(props.height) - 10
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View
        style={{borderRadius: 5, width, height}}
        elevation={5}
        mt={`${IMAGE_PADDING_TOP}px`}
        mb={`${IMAGE_PADDING_BOTTOM}px`}
        bg="pink"
      >
        <ImageBackground source={source} style={[style, {width, height}]}>
          {disabled && <ComingSoon />}
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
        onPress={() => onChange({neighborhoodsSlugs: [item.value]})}
      />
    )
  }

  render() {
    const {width, data} = this.props
    const {itemWidth, itemHeight} = this.state
    return (
      <View>
        <GradientOverlay from={0} to={1} size={0.2} axis="x" />
        <Carousel
          enableMomentum
          enableSnap={false}
          inactiveSlideOpacity={1}
          inactiveSlideScale={1}
          activeSlideAlignment="start"
          containerCustomStyle={{paddingLeft: 15}}
          contentContainerCustomStyle={{paddingRight: 25}}
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
