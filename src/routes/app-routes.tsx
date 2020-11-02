import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { registeredRoutes } from './register-routes'

const Stack = createStackNavigator()

export const AppRoutes = (): JSX.Element => (
  <NavigationContainer>
    <Stack.Navigator>
      {registeredRoutes.map(({ name, component, options }) => (
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
