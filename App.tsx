import { StatusBar } from 'react-native'
import React from 'react'
import { Home } from './src/screens/Home'

const App: React.FC = () => {
  return (
    <React.Fragment>
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent
      />
      <Home />
    </React.Fragment>
  )
}

export default App
