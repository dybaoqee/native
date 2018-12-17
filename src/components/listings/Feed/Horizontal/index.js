import React, {Component} from 'react'
import {Dimensions} from 'react-native'
import Carousel from 'react-native-snap-carousel'
import {View} from '@emcasa/ui-native'

import Card from '@/components/listings/Card'

class HorizontalListingFeed extends Component {
  static defaultProps = {
    Card,
    get itemWidth() {
      return Dimensions.get('window').width / 1.25
    },
    get width() {
      return Dimensions.get('window').width
    }
  }

  slider = React.createRef()

  shouldComponentUpdate(nextProps) {
    return (
      nextProps.data.length !== this.props.data.length ||
      nextProps.active !== this.props.active
    )
  }

  componentDidUpdate(prev) {
    const {active, data} = this.props
    const slider = this.slider.current
    if (slider && prev.active !== active && active) {
      slider.snapToItem(data.findIndex(({id}) => id == active))
    }
  }

  get totalCount() {
    return this.props.data.length
  }

  renderItem = ({item, index}) => {
    const {onSelect, itemWidth, Card} = this.props
    return (
      <Card
        width={itemWidth}
        showImages={1}
        onPress={onSelect}
        index={index}
        {...item}
      />
    )
  }

  render() {
    if (!this.totalCount) return null
    const {style, loop, width, itemWidth, ...props} = this.props
    delete props.onSelect
    delete props.Card
    return (
      <Carousel
        enableMomentum
        removeClippedSubviews
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        initialNumToRender={4}
        maxToRenderPerBatch={4}
        activeSlideAlignment={loop ? 'center' : 'start'}
        containerCustomStyle={[{flex: null}, style]}
        sliderWidth={width}
        ref={this.slider}
        style={style}
        slideStyle={{padding: 10}}
        itemWidth={itemWidth + 20}
        renderItem={this.renderItem}
        {...props}
      />
    )
  }
}

export default View.withComponent(HorizontalListingFeed)
