import React, { useState, useEffect } from 'react'
import { version } from '../../../package.json'
import {
  Wrapper,
  TextLogo,
  TextMain,
  ButtonBottom,
  TitleContent,
  TextButtonBottom,
  IconLeftButtom,
  Header,
  Body,
  Footer,
  Icon,
  ContentTitle,
  TextVersion
} from './styles'
import HumanIcon from '../../assets/human.svg'
import HumanIconDark from '../../assets/dark/humanDark.svg'
import { useNavigation } from '@react-navigation/native'
import NetInfo from '@react-native-community/netinfo'
import { AlertAnimated } from '../../components/Alert'
import { useColorScheme } from 'react-native-appearance'
import { RoutesName } from '../../routes/routes-names'

export const Home = (): JSX.Element => {
  const colorScheme = useColorScheme()
  const navigation = useNavigation()
  const [isConnected, setIsConnected] = useState<boolean>()
  useEffect(() => {
    NetInfo.addEventListener(({ isInternetReachable }) => {
      setIsConnected(!!isInternetReachable)
    })
  }, [])

  const handleNavigate = () => {
    if (isConnected) {
      navigation.navigate(RoutesName.MAPS)
      navigation.reset({
        index: 1,
        routes: [{ name: RoutesName.MAPS }]
      })
    }
  }
  return (
    <Wrapper>
      {!isConnected && (
        <AlertAnimated
          title="No connection"
          description="Verify you connection"
          backgroundColor="#f2cccc"
          colorActions="#FF0000"
          iconName="wifi-off"
        />
      )}
      <Header>
        <Icon
          source={
            colorScheme === 'dark'
              ? require('../../assets/dark/logo.png')
              : require('../../assets/logo.png')
          }
        />
      </Header>
      <Body>
        <ContentTitle>
          <TextLogo>Descarte</TextLogo>
          <TextLogo grenColor> correto</TextLogo>
        </ContentTitle>
        {colorScheme === 'dark' ? <HumanIconDark /> : <HumanIcon />}
        <TitleContent>
          <TextMain color="grey">Bem vindo</TextMain>
          <TextMain color="green">Vamos ajudar o planeta</TextMain>
        </TitleContent>
      </Body>
      <Footer>
        <ButtonBottom disable={!!isConnected} onPress={() => handleNavigate()}>
          <TextButtonBottom>Buscar pontos de descartes</TextButtonBottom>
          <IconLeftButtom />
        </ButtonBottom>
      </Footer>
      <TextVersion>{version}</TextVersion>
    </Wrapper>
  )
}
