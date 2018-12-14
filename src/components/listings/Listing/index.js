import {View, Col, Icon} from '@emcasa/ui-native'

import Map, {Marker} from '../Map'
import Description from './Description'
import Properties from './Properties'
import Header from './Header'

export default function ListingView(props) {
  const {address} = props
  return (
    <Col flex={1}>
      <Header ready={props.ready} testID="listing_header" {...props} />
      <Properties {...props} />
      <Description {...props} />
      {props.ready && (
        <View
          mb="25px"
          testID="listing_map"
          style={{overflow: 'hidden', marginHorizontal: 15}}
          borderRadius={4}
        >
          <Map zoom="close" style={{width: '100%', height: 300}} {...address}>
            <Marker address={address}>
              <Icon name="home" color="pink" size={20} />
            </Marker>
          </Map>
        </View>
      )}
    </Col>
  )
}
