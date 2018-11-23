import {View} from 'react-native'
import {Marker, Callout} from 'react-native-maps'
import {Text} from '@emcasa/ui-native'

import {abbrevPrice} from '@/config/formatting'
import $styles from './styles'

function ListingMarker({
  styles,
  price,
  address: {lat, lng},
  children,
  ...props
}) {
  return (
    <Marker
      {...props}
      coordinate={{
        latitude: lat,
        longitude: lng
      }}
    >
      <View style={styles.container}>
        <View style={styles.body}>
          {children ? (
            children
          ) : (
            <Text style={styles.text}>{abbrevPrice(price)}</Text>
          )}
        </View>
        <View style={styles.tip} />
      </View>
      <Callout tooltip />
    </Marker>
  )
}

export default $styles.inject()(ListingMarker)
