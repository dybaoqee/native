import _ from 'lodash/fp'
import React, {PureComponent} from 'react'
import {FlatList as RCTFlatList} from 'react-native'
import {View} from '@emcasa/ui-native'

import Card from '@/components/listings/Card'

const keyExtractor = _.flow(
  _.get('id'),
  _.toString
)

const FlatList = View.withComponent(RCTFlatList)

class VerticalListingFeed extends PureComponent {
  static defaultProps = {
    Card
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
    const {pagination, ...props} = this.props
    delete props.onSelect
    delete props.Card
    return (
      <FlatList
        {...props}
        removeClippedSubviews={process.env.NODE_ENV !== 'e2e'}
        initialNumToRender={10}
        maxToRenderPerBatch={6}
        updateCellsBatchingPeriod={100}
        testID="listing_feed"
        pagination={pagination}
        keyExtractor={keyExtractor}
        renderItem={this.renderItem}
      />
    )
  }
}

export default React.forwardRef((props, ref) => (
  <VerticalListingFeed {...props} innerRef={ref} />
))
