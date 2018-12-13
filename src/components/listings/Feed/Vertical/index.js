import _ from 'lodash/fp'
import cmp from 'shallowequal'
import React, {Component} from 'react'
import {FlatList} from 'react-native'
import {View} from '@emcasa/ui-native'

import Card from '@/components/listings/Card'

const keyExtractor = _.flow(
  _.get('id'),
  _.toString
)

class VerticalListingFeed extends Component {
  static defaultProps = {
    Card
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.data.length !== this.props.data.length
  }

  renderItem = ({item, index}) => {
    const {onSelect, Card} = this.props
    return (
      <Card
        mt="5px"
        mb="5px"
        ml="15px"
        mr="15px"
        index={index}
        onPress={onSelect}
        {...item}
      />
    )
  }

  render() {
    const {pagination, innerRef, ...props} = this.props
    delete props.onSelect
    delete props.Card
    return (
      <FlatList
        ref={innerRef}
        removeClippedSubviews
        initialNumToRender={10}
        maxToRenderPerBatch={6}
        testID="listing_feed"
        pagination={pagination}
        keyExtractor={keyExtractor}
        renderItem={this.renderItem}
        {...props}
      />
    )
  }
}

export default View.withComponent(
  React.forwardRef((props, ref) => (
    <VerticalListingFeed {...props} innerRef={ref} />
  ))
)
