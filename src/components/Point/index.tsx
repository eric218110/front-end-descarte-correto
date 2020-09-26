import React from 'react'
import { Wrapper, Container, ImageContainer, PointContainer } from './style'

type IPropsPoint = {
  backgroundColor: string
}

export const Point = ({ backgroundColor }: IPropsPoint): JSX.Element => (
  <Wrapper>
    <Container>
      <ImageContainer />
      <PointContainer backgroundColor={backgroundColor} />
    </Container>
  </Wrapper>
)
