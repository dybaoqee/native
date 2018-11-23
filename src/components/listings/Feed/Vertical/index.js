import _ from 'lodash/fp'
import {FlatList} from 'react-native'
import {View} from '@emcasa/ui-native'

import Card from '@/components/listings/Card'

const keyExtractor = _.flow(
  _.get('id'),
  _.toString
)

const createHandler = (fun, ...args) => fun && (() => fun(...args))

function VerticalListingFeed({onSelect, pagination, Card, ...props}) {
  return (
    <FlatList
      {...props}
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
}

VerticalListingFeed.defaultProps = {
  Card
}

export default View.withComponent(VerticalListingFeed)
