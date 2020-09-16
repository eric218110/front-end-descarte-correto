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
import { TouchableOpacity, Text } from 'react-native'
import { AlertAnimated } from '../../components/Alert'

export const Home: React.FC = () => {
  const navigation = useNavigation()
  const [isConnected, setIsConnected] = useState<boolean>()
  useEffect(() => {
    NetInfo.addEventListener(({ isInternetReachable }) => {
      setIsConnected(!!isInternetReachable)
    })
  }, [])

  const handleNavigate = () => {
    if (isConnected) {
      navigation.navigate('Maps')
      navigation.reset({
        index: 1,
        routes: [{ name: 'Maps' }]
      })
    }
  }
  return (
    <Wrapper>
      <Container>
        {!isConnected && (
          <AlertAnimated
            title="No connection"
            description="Verify you connection"
            backgroundColor="#f2cccc"
            colorActions="#FF0000"
            iconName="wifi-off"
          />
        )}

        <Logo>
          <LogoIcon />
          <TextLogo>Any Name</TextLogo>
        </Logo>
        <Main>
          <HumanIcon style={{ flex: 1 }} />
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
