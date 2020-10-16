import React from 'react'
import { Container, IconPointLocation, TextNamePoint } from './styles'

type IPropsItem = {
  name: string
  colorBackground: string
  activeColor: string
}

export const Item = ({
  name,
  colorBackground,
  activeColor
}: IPropsItem): JSX.Element => (
  <Container color={colorBackground}>
    <IconPointLocation color={activeColor} />
    <TextNamePoint color={activeColor} numberOfLines={1}>
      {name}
    </TextNamePoint>
  </Container>
)
