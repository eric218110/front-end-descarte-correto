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
    apikey={'AIzaSyDaouL2YzYKvgTOGi3rGhS4DmqStoBdpyI'}
  />
)
