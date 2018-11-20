import {Dimensions} from 'react-native'

import Card from '@/components/listings/Card'
import HorizontalFeed from '../Horizontal'

export default function RelatedFeed(props) {
  const width = Dimensions.get('window').width
  return (
    <HorizontalFeed
      {...props}
      style={{paddingLeft: 10}}
      slideStyle={{padding: 10}}
      itemWidth={width - 40}
      renderItem={(item) => (
        <Card width={width - 60} showImages={1} {...item} />
      )}
    />
  )
}
