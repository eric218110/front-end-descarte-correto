import React from 'react'
import { ThemeProvider } from 'styled-components'
import { AccountProvider } from '../../context/account-context'
import { PointProvider } from '../../context/point-context'
import { ItemsProvider } from '../../context/items-context'
import { light, dark } from '../../../styles/themes'
import { useColorScheme } from 'react-native-appearance'
import { StatusBar } from 'react-native'

export const AppProvider = ({
  children
}: {
  children: JSX.Element
}): JSX.Element => {
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
          <ItemsProvider>{children}</ItemsProvider>
        </PointProvider>
      </AccountProvider>
    </ThemeProvider>
  )
}
