import _ from 'lodash'
import React, {PureComponent} from 'react'
import {TouchableOpacity} from 'react-native'
import SwipeableView from 'react-swipeable-views-native/lib/SwipeableViews.scroll'
import {View} from '@emcasa/ui-native'

import Image from '../Image'
import Pagination from './Pagination'

export default class ListingGallery extends PureComponent {
  static defaultProps = {
    initialIndex: 0,
    paginationDelta: 2
  }

  state = {
    dimensions: {}
  }

  static getDerivedStateFromProps(props, state) {
    return {
      index:
        typeof state.index === 'undefined' ? props.initialIndex : state.index
    }
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

  onChangeIndex = (_index) => {
    const {onChangeIndex} = this.props
    const index = Math.floor(_index)
    this.setState({index})
    if (onChangeIndex) onChangeIndex(index)
  }

  onLayout = (e) => {
    const {index} = this.state
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
      x: dimensions.width * index,
      y: 0,
      animated: false
    })
  }

  renderImage = (image, index) => {
    const {onPressImage} = this.props
    const {index: currentIndex} = this.state
    const {width, height, ...imageProps} = this.imageProps
    // Placeholder
    if (Math.abs(index - currentIndex) > 2)
      return <View key={image.filename} width={width} height={height} />
    return (
      <TouchableOpacity
        key={index}
        activeOpacity={0.95}
        disabled={!onPressImage}
        onPress={() => onPressImage(index)}
        style={{width: '100%', height: '100%'}}
      >
        {React.isValidElement(image) ? (
          image
        ) : (
          <Image
            resolution={imageProps.scalable ? 4.5 : 1}
            width={width}
            height={height}
            {...imageProps}
            {...image}
          />
        )}
      </TouchableOpacity>
    )
  }

  render() {
    const {scalable, style, props} = this.props
    const {index} = this.state
    return (
      <View
        {...props}
        style={[{flex: 1, position: 'relative'}].concat(style)}
        onLayout={this.onLayout}
      >
        <SwipeableView
          keyboardShouldPersistTaps="always"
          ref={this.galleryRef}
          index={index}
          onLayout={this.onLayout}
          style={{
            flex: 1,
            width: '100%'
          }}
          slideStyle={{
            justifyContent: 'center',
            alignItems: 'flex-start'
          }}
          onChangeIndex={this.onChangeIndex}
        >
          {this.items.map(this.renderImage)}
        </SwipeableView>
        <View style={{position: 'absolute', bottom: 10, width: '100%'}}>
          <Pagination
            displayText={scalable}
            currentPosition={index}
            totalPages={this.items.length}
          />
        </View>
      </View>
    )
  }
}
