import React from 'react'
import { MapViewDirectionsStyled } from './style'
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
  <MapViewDirectionsStyled
    origin={origin}
    destination={destination}
    onReady={onReady}
    apikey={'AIzaSyBHAXOz2WSqIt4HziGNdnWXjlz2bf03-k4'}
  />
)
