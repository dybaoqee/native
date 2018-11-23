import React, {Component} from 'react'
import {Dimensions} from 'react-native'
import Carousel from 'react-native-snap-carousel'

const createHandler = (fun, ...args) => fun && (() => fun(...args))

export default class HorizontalFeed extends Component {
  static defaultProps = {
    get itemWidth() {
      return Dimensions.get('window').width / 1.25
    },
    get width() {
      return Dimensions.get('window').width
    }
  }

  slider = React.createRef()

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

  renderer = (fun) => ({item}) => {
    const {onSelect} = this.props
    return fun({...item, onPress: createHandler(onSelect, item.id)})
  }

  render() {
    if (!this.totalCount) return null
    const {style, loop, width, ...props} = this.props
    props.renderItem = this.renderer(props.renderItem)
    return (
      <Carousel
        enableMomentum
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        activeSlideAlignment={loop ? 'center' : 'start'}
        containerCustomStyle={[{flex: null}, style]}
        sliderWidth={width}
        ref={this.slider}
        {...props}
      />
    )
  }
}
