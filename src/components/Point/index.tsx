import React from 'react'
import { Container, Icon, LogoStyled } from './styles'

export const Point = ({
  backgroundColor
}: {
  backgroundColor?: string
}): JSX.Element => {
  return (
    <Container>
      <LogoStyled />
      <Icon backgroundColor={backgroundColor} />
    </Container>
  )
}
