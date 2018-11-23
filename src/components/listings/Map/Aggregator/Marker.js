import {Component} from 'react'
import {Marker, Callout} from 'react-native-maps'
import {View, Text} from '@emcasa/ui-native'

import styles from './styles'

export default class AggregatorMarker extends Component {
  render() {
    const {children, ...props} = this.props

    return (
      <Marker {...props}>
        <View style={styles.container}>
          <Text style={styles.text}>{children}</Text>
        </View>
        <Callout tooltip />
      </Marker>
    )
  }
}
