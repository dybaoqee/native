import MapView from 'react-native-maps'
import Marker from './Marker'

export {Marker}

const Zoom = {
  close: {
    latitudeDelta: 0.01,
    longitudeDelta: 0.01
  },
  far: {
    latitudeDelta: 0.1,
    longitudeDelta: 0.1
  }
}

export default function ListingMap({
  mapRef,
  children,
  zoom,
  lat,
  lng,
  initialRegion,
  style,
  as: MapView,
  ...props
}) {
  return (
    <MapView
      ref={mapRef}
      style={[{flex: 1, width: '100%', height: '100%'}, style]}
      initialRegion={
        initialRegion || {
          latitude: lat,
          longitude: lng,
          ...Zoom[zoom]
        }
      }
      {...props}
    >
      {children}
    </MapView>
  )
}

ListingMap.defaultProps = {
  lat: -22.9608099,
  lng: -43.2096142,
  zoom: 'far',
  as: MapView
}
