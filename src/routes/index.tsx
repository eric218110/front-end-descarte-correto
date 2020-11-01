import React from 'react'
import { AppRoutes } from './app-routes'
import { AccountProvider } from '../service/context/account-context'
import { PointProvider } from '../service/context/point-context'
import { ThemeProvider } from 'styled-components'
import { light, dark } from '../styles/themes'
import { useColorScheme } from 'react-native-appearance'
import { StatusBar } from 'react-native'
import { ItemsProvider } from '../service/context/items-context'

export const Routes: React.FC = () => {
  const colorScheme = useColorScheme()
  const themeStatusBarStyle =
    colorScheme === 'light' ? 'dark-content' : 'light-content'
  return (
    <ThemeProvider theme={colorScheme === 'dark' ? dark : light}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={themeStatusBarStyle}
      />
      <AccountProvider>
        <PointProvider>
          <ItemsProvider>
            <AppRoutes />
          </ItemsProvider>
        </PointProvider>
      </AccountProvider>
    </ThemeProvider>
  )
}
