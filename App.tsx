/* eslint-disable camelcase */
import { StatusBar } from 'react-native'
import React from 'react'
import { Routes } from './src/routes'
import { AppLoading } from 'expo'
import { AppearanceProvider } from 'react-native-appearance'
import {
  useFonts,
  Roboto_500Medium,
  Roboto_400Regular,
  Roboto_300Light,
  Roboto_700Bold
} from '@expo-google-fonts/roboto'

const App = (): JSX.Element => {
  const [fontsLoaded] = useFonts({
    roboto_200: Roboto_300Light,
    roboto_400: Roboto_500Medium,
    roboto_500: Roboto_400Regular,
    roboto_700: Roboto_700Bold
  })

  if (!fontsLoaded) return <AppLoading />

  return (
    <AppearanceProvider>
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent
      />
      <Routes />
    </AppearanceProvider>
  )
}

export default App
