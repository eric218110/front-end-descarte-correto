import React from 'react'
import MapViewDirections from 'react-native-maps-directions'

type DirectionsProps = {
  origin: {
    latitude: number
    longitude: number
  }
  destination: {
    latitude: number
    longitude: number
  }
}

export const DestinationMapsComponent = ({
  origin,
  destination
}: DirectionsProps): JSX.Element => (
  <MapViewDirections
    origin={origin}
    destination={destination}
    apikey="AIzaSyBHAXOz2WSqIt4HziGNdnWXjlz2bf03-k4"
  />
)
