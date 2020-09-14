import React, { useState, useEffect } from 'react'
import {
  Container,
  Wrapper,
  Logo,
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
import LogoIcon from '../../assets/logo.svg'
import { useNavigation } from '@react-navigation/native'
import NetInfo from '@react-native-community/netinfo'
import { Alert } from 'react-native'

export const Home: React.FC = () => {
  const navigation = useNavigation()
  const [isConnected, setIsConnected] = useState<boolean>()
  useEffect(() => {
    NetInfo.addEventListener(({ isInternetReachable }) => {
      console.log(isInternetReachable)
      setIsConnected(!!isInternetReachable)
    })
    console.log(isConnected)
  }, [])

  const handleNavigate = () => {
    if (isConnected) {
      navigation.navigate('Maps')
      navigation.reset({
        index: 1,
        routes: [{ name: 'Maps' }]
      })
    } else {
      Alert.alert('No connection')
    }
  }
  return (
    <Wrapper>
      <Container>
        <Logo>
          <LogoIcon />
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
          <ButtonBottom
            disable={!!isConnected}
            onPress={() => handleNavigate()}
          >
            <TextButtonBottom>Find Collect points</TextButtonBottom>
            <ContentRight disable={!!isConnected}>
              <IconLeftButtom />
            </ContentRight>
          </ButtonBottom>
        </Bottom>
      </Container>
    </Wrapper>
  )
}
