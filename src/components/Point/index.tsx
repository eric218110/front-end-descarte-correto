import React from 'react'
import { Container, MarkerLocationInitialPoint } from './style'
import InitialLocationSVG from '../../assets/InitialLocation.svg'

export const Point = (): JSX.Element => <Container />

export const InitialPoint = (): JSX.Element => (
  <MarkerLocationInitialPoint>
    <InitialLocationSVG />
  </MarkerLocationInitialPoint>
)
