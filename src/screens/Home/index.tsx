import React from 'react'
import {
  Container,
  Wrapper,
  Logo,
  ImageLogo,
  TextLogo,
  Main,
  TextMain,
  Bottom,
  ButtonBottom,
  TitleContent,
  TextButtonBottom,
  ContentRight,
  IconLeftButtom
} from './styles'
import HumanIcon from '../../assets/human.svg'

export const Home: React.FC = () => (
  <Wrapper>
    <Container>
      <Logo>
        <ImageLogo source={require('../../assets/logo.png')} />
        <TextLogo>Any Name</TextLogo>
      </Logo>
      <Main>
        <HumanIcon width={153} height={260} />
        <TitleContent>
          <TextMain color="grey">Welcome my App</TextMain>
          <TextMain color="green">Let´s help our planet</TextMain>
        </TitleContent>
      </Main>
      <Bottom>
        <ButtonBottom>
          <TextButtonBottom>Find Collect points</TextButtonBottom>
          <ContentRight>
            <IconLeftButtom />
          </ContentRight>
        </ButtonBottom>
      </Bottom>
    </Container>
  </Wrapper>
)
