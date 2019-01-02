import {PureComponent} from 'react'
import {View, Col, Icon} from '@emcasa/ui-native'

import BaseMap, {Marker} from '../Map'
import Description from './Description'
import Properties from './Properties'
import Header from './Header'
import styled from 'styled-components/native'

const MapView = styled(View)`
  overflow: hidden;
  margin-horizontal: 15px;
  margin-bottom: 25px;
  border-radius: 4px;
`

const Map = styled(function Map({style, testID, address}) {
  return (
    <MapView testID={testID}>
      <BaseMap zoom="close" style={style} {...address}>
        <Marker address={address}>
          <Icon name="home" color="pink" size={20} />
        </Marker>
      </BaseMap>
    </MapView>
  )
})`
  width: 100%;
  height: 300;
`

export default class ListingView extends PureComponent {
  render() {
    const {ready, ...props} = this.props
    return (
      <Col flex={1}>
        <Header testID="listing_header" {...props} />
        <Properties {...props} />
        <Description {...props} />
        {ready && <Map testID="listing_map" address={props.address} />}
      </Col>
    )
  }
}
