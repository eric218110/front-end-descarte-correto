import React from 'react'
import { ActivityIndicator, View } from 'react-native'

export const Loading = (): JSX.Element => (
  <View
    style={{
      height: '100%',
      justifyContent: 'center'
    }}
  >
    <ActivityIndicator size={45} animating />
  </View>
)
