import React from 'react'
import {
  Container,
  IconPointLocation,
  TextNamePoint,
  IconRemoveFilterPoint
} from './styles'

type IPropsItem = {
  name: string
  colorBackground: string
}

export const Item = ({ name, colorBackground }: IPropsItem): JSX.Element => (
  <Container color={colorBackground}>
    <IconPointLocation />
    <TextNamePoint numberOfLines={1}>{name}</TextNamePoint>
    <IconRemoveFilterPoint />
  </Container>
)
