import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { registerRoutes } from './routes'

const Stack = createStackNavigator()

export const AppRoutes = (): JSX.Element => (
  <NavigationContainer>
    <Stack.Navigator>
      {registerRoutes.map(({ name, component, options }) => (
        <Stack.Screen
          key={Math.random()}
          name={name}
          component={component}
          options={options}
        />
      ))}
    </Stack.Navigator>
  </NavigationContainer>
)
