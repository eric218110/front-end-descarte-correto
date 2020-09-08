import React from 'react'
import {
  Container,
  Wrapper,
  Logo,
  ImageLogo,
  TextLogo,
  Main,
  ImageMain,
  TextMain,
  Bottom,
  ButtonBottom
} from './styles'

export const Home: React.FC = () => (
  <Wrapper>
    <Container>
      <Logo>
        <ImageLogo />
        <TextLogo>Any Name</TextLogo>
      </Logo>
      <Main>
        <ImageMain />
        <TextMain>Welcome my App</TextMain>
        <TextMain>Let´s help our planet</TextMain>
      </Main>
      <Bottom>
        <ButtonBottom>Find Collect points</ButtonBottom>
      </Bottom>
    </Container>
  </Wrapper>
)
