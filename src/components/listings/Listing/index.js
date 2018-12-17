import {Component} from 'react'
import {View, Col, Icon} from '@emcasa/ui-native'

import Map, {Marker} from '../Map'
import Description from './Description'
import Properties from './Properties'
import Header from './Header'

export default class ListingView extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.id !== this.props.id || nextProps.ready !== this.props.ready
    )
  }

  render() {
    const {address, ready} = this.props
    return (
      <Col flex={1}>
        <Header testID="listing_header" {...this.props} />
        <Properties {...this.props} />
        <Description {...this.props} />
        {ready && (
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
}
