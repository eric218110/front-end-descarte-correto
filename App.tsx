import { StatusBar } from 'react-native'
import React from 'react'
import { Routes } from './src/routes'

const App: React.FC = () => {
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
