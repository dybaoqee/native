import _ from 'lodash/fp'
import {FlatList} from 'react-native'

import Card from '@/components/listings/Card'

const keyExtractor = _.flow(
  _.get('id'),
  _.toString
)

const createHandler = (fun, ...args) => fun && (() => fun(...args))

export default function ListingFeed({onSelect, pagination, Card, ...props}) {
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
          testUniqueID={index + 1}
          onPress={createHandler(onSelect, item.id)}
          {...item}
        />
      )}
    />
  )
}

ListingFeed.defaultProps = {
  Card
}
