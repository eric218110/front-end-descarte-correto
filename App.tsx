/* eslint-disable camelcase */
import { StatusBar } from 'react-native'
import React from 'react'
import { Routes } from './src/routes'
import { AppLoading } from 'expo'
import {
  useFonts,
  Roboto_500Medium,
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto'

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    roboto_400: Roboto_500Medium,
    roboto_500: Roboto_400Regular,
    roboto_700: Roboto_700Bold
  })

  if (!fontsLoaded) return <AppLoading />

  return (
    <React.Fragment>
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent
      />
      <Routes />
    </React.Fragment>
  )
}

export default App
