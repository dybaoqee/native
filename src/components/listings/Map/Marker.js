import {Marker, Callout} from 'react-native-maps'
import {Icon} from '@emcasa/ui-native'

export default function ListingMarker({address: {lat, lng}, ...props}) {
  return (
    <Marker
      {...props}
      coordinate={{
        latitude: lat,
        longitude: lng
      }}
    >
      <Icon name="map-marker-alt" color="pink" size={35} />
      <Callout tooltip />
    </Marker>
  )
}
