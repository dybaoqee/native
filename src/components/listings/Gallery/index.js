import _ from 'lodash'
import React, {PureComponent} from 'react'
import {TouchableOpacity, StyleSheet} from 'react-native'
import SwipeableView from 'react-swipeable-views-native/lib/SwipeableViews.scroll'
import {View} from '@emcasa/ui-native'

import Image from '../Image'
import Pagination from './Pagination'

const styles = StyleSheet.create({
  swipeableView: {
    flex: 1,
    width: '100%'
  },
  swipeableViewSlide: {
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 10,
    width: '100%'
  }
})
export default class ListingGallery extends PureComponent {
  static defaultProps = {
    lazy: true,
    initialIndex: 0,
    paginationDelta: 2
  }

  state = {
    dimensions: {}
  }

  swipeableViewRef = React.createRef()

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
    if (this.swipeableViewRef.current) {
      this.swipeableViewRef.current.handleLayout(e)
      this.swipeableViewRef.current.scrollViewNode.scrollTo({
        x: dimensions.width * index,
        y: 0,
        animated: false
      })
    }
  }

  renderImage = (image, index) => {
    const {lazy, onPressImage} = this.props
    const {index: currentIndex} = this.state
    const {width, height, ...imageProps} = this.imageProps
    // Placeholder
    if (lazy && Math.abs(index - currentIndex) > 2)
      return <View key={index} width={width} height={height} />
    return (
      <TouchableOpacity
        accessible
        testID={`gallery_slide(${index + 1})`}
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
    const {scalable, style, testID, ...props} = this.props
    const {index} = this.state
    return (
      <View
        {...props}
        style={[{flex: 1, position: 'relative'}].concat(style)}
        onLayout={this.onLayout}
      >
        <SwipeableView
          testID={testID}
          keyboardShouldPersistTaps="always"
          ref={this.swipeableViewRef}
          index={index}
          onLayout={this.onLayout}
          style={styles.swipeableView}
          slideStyle={styles.swipeableViewSlide}
          onChangeIndex={this.onChangeIndex}
        >
          {this.items.map(this.renderImage)}
        </SwipeableView>
        <View style={styles.paginationContainer}>
          <Pagination
            displayText={scalable}
            index={index}
            totalPages={this.items.length}
          />
        </View>
      </View>
    )
  }
}
