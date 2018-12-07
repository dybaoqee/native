import {Component} from 'react'
import {View, Col, Icon} from '@emcasa/ui-native'

import Map, {Marker} from '../Map'
import Description from './Description'
import Properties from './Properties'
import Header from './Header'

export default class ListingView extends Component {
  state = {
    ready: false
  }

  get ready() {
    return this.state.ready && this.props.ready
  }

  componentDidMount() {
    requestAnimationFrame(() => this.setState({ready: true}))
  }

  render() {
    const {address} = this.props
    return (
      <Col flex={1}>
        <Header ready={this.ready} testID="listing_header" {...this.props} />
        <Properties {...this.props} />
        <Description {...this.props} />
        {this.ready && (
          <View
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
