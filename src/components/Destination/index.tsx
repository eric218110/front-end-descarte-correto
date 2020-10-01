import React from 'react'
import MapViewDirections from 'react-native-maps-directions'
import { colors } from '../../styles/colors'

export type DirectionsProps = {
  origin: {
    latitude: number
    longitude: number
  }
  destination: {
    latitude: number
    longitude: number
  }
  onReady?: () => void
}

export const DestinationMapsComponent = ({
  origin,
  destination,
  onReady
}: DirectionsProps): JSX.Element => (
  <MapViewDirections
    origin={origin}
    destination={destination}
    onReady={onReady}
    strokeColor={colors.primary}
    strokeWidth={3}
    apikey={'AIzaSyBHAXOz2WSqIt4HziGNdnWXjlz2bf03-k4'}
  />
)
