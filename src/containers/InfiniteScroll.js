import React, {Component} from 'react'

export default class InfiniteScroll extends Component {
  static defaultProps = {
    threshold: 1500,
    direction: 'vertical'
  }

  onLoad = () => this.props.onLoad()

  isOverThreshold = ({contentOffset, contentSize, layoutMeasurement}) => {
    const {threshold, direction} = this.props
    let offset, length
    if (direction === 'vertical') {
      offset = contentOffset.y
      length = contentSize.height - layoutMeasurement.height
    } else {
      offset = contentOffset.x
      length = contentSize.width - layoutMeasurement.width
    }
    const distance = length - offset
    return !isNaN(distance) && Math.abs(distance) <= threshold
  }

  onScroll = ({nativeEvent}) => {
    if (
      !this.props.loading &&
      this.props.hasNextPage &&
      this.isOverThreshold(nativeEvent)
    ) {
      this.onLoad()
    }
  }

  render() {
    const children = React.Children.only(this.props.children)
    return React.cloneElement(children, {
      onScroll: this.onScroll,
      scrollEventThrottle: 200
    })
  }
}
