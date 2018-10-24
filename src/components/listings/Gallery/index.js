import _ from 'lodash'
import {PureComponent} from 'react'
import {StyleSheet} from 'react-native'
import SwipeableView from 'react-swipeable-views-native/lib/SwipeableViews.scroll'
import {View} from '@emcasa/ui-native'

import Image from '../Image'
import Pagination from './Pagination'
import styles from './styles'

StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1
  },
  gallery: {
    flex: 1,
    width: '100%'
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  pagination: {
    position: 'absolute',
    bottom: 10,
    width: '100%'
  }
})

export default class ListingGallery extends PureComponent {
  static defaultProps = {
    paginationDelta: 2
  }

  state = {
    position: 0,
    dimensions: {}
  }

  get items() {
    return this.props.children
  }

  get layout() {
    const {width, height} = this.props
    const {dimensions} = this.state
    return _.defaults({width, height}, dimensions)
  }

  get imageProps() {
    const {scalable} = this.props
    const layout = this.layout
    if (scalable) layout.height = layout.width * 0.6
    return {
      scalable,
      ...layout
    }
  }

  galleryRef = (node) => {
    this.gallery = node
  }

  onChange = (position) => this.setState({position: Math.floor(position)})

  onLayout = (e) => {
    const {position} = this.state
    const {
      nativeEvent: {layout}
    } = e
    const dimensions = {
      width: layout.width,
      height: layout.height
    }
    this.setState({dimensions})
    this.gallery.handleLayout(e)
    this.gallery.scrollViewNode.scrollTo({
      x: dimensions.width * position,
      y: 0,
      animated: false
    })
  }

  renderImage = (image, index) => {
    const {position} = this.state
    const {width, height, ...imageProps} = this.imageProps
    // Placeholder
    if (Math.abs(index - position) > 2)
      return <View key={image.filename} width={width} height={height} />
    return (
      <Image
        key={`${index}.${image.filename}`}
        resolution={imageProps.scalable ? 4.5 : 1}
        width={width}
        height={height}
        {...imageProps}
        {...image}
      />
    )
  }

  render() {
    const {scalable, style, props} = this.props
    const {position} = this.state
    return (
      <View
        {...props}
        style={[styles.container].concat(style)}
        onLayout={this.onLayout}
      >
        <SwipeableView
          ref={this.galleryRef}
          onLayout={this.onLayout}
          style={{
            flex: 1,
            width: '100%'
          }}
          slideStyle={{
            justifyContent: 'center',
            alignItems: 'flex-start'
          }}
          onChangeIndex={this.onChange}
        >
          {this.items.map(this.renderImage)}
        </SwipeableView>
        <View style={styles.pagination}>
          <Pagination
            displayText={scalable}
            currentPosition={position}
            totalPages={this.items.length}
          />
        </View>
      </View>
    )
  }
}
