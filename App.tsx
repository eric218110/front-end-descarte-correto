import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Home } from './src/screens/Home'

const App: React.FC = () => {
  return (
    <React.Fragment>
      <StatusBar style="auto" />
      <Home />
    </React.Fragment>
  )
}

export default App
