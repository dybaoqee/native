import _ from 'lodash/fp'
import React from 'react'
import {FlatList} from 'react-native'
import {View} from '@emcasa/ui-native'

import Card from '@/components/listings/Card'

const keyExtractor = _.flow(
  _.get('id'),
  _.toString
)

const createHandler = (fun, ...args) => fun && (() => fun(...args))

const VerticalListingFeed = View.withComponent(function VerticalListingFeed({
  onSelect,
  pagination,
  Card,
  innerRef,
  ...props
}) {
  return (
    <FlatList
      {...props}
      ref={innerRef}
      testID="listing_feed"
      pagination={pagination}
      keyExtractor={keyExtractor}
      removeClippedSubviews={process.env.NODE_ENV === 'production'}
      renderItem={({item, index}) => (
        <Card
          mt="5px"
          mb="5px"
          ml="15px"
          mr="15px"
          index={index}
          onPress={createHandler(onSelect, item.id)}
          {...item}
        />
      )}
    />
  )
})

VerticalListingFeed.defaultProps = {
  Card
}

export default React.forwardRef((props, ref) => (
  <VerticalListingFeed {...props} innerRef={ref} />
))
