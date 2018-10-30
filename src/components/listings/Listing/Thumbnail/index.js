import {Component, Fragment} from 'react'
import {View, TouchableOpacity, Dimensions} from 'react-native'

import BaseIcon from '@/components/shared/Icon'
import Image from '@/components/listings/Image'
import Gallery from '@/components/listings/Gallery'
import styles, {iconColor} from './styles'

const ActionButton = ({children, title, onPress, hitSlop}) => (
  <View style={styles.button}>
    <TouchableOpacity
      accessible
      accessibilityLabel={title}
      accessibilityTraits="button"
      hitSlop={{
        top: hitSlop,
        bottom: hitSlop,
        left: hitSlop,
        right: hitSlop
      }}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  </View>
)

ActionButton.defaultProps = {
  hitSlop: 5
}

const Icon = (props) => <BaseIcon size={20} color={iconColor} {...props} />

export default class ListingThumbnail extends Component {
  onOpenGallery = () => this.props.onOpenGallery()

  onOpenTour = () => {
    this.props.onOpenTour()
    this.props.onViewTour()
  }

  render() {
    const {
      testID,
      images,
      favorite,
      blacklisted,
      matterportCode,
      isActive
    } = this.props
    let {width, height} = Dimensions.get('window')
    height = width * 0.64
    return (
      <View style={styles.container} testID={testID}>
        <View>
          {images && images.length ? (
            <Gallery testID={`${testID}_gallery`} width={width} height={height}>
              {images.slice(0, 4)}
            </Gallery>
          ) : (
            <Image width={width} height={height} />
          )}
        </View>
      </View>
    )
  }
}
