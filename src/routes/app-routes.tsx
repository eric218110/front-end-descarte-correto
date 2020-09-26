import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Home as HomeScreen } from '../screens/Home'
import { Map as MapScreen } from '../screens/Map'
import { AddPoint as AddPointScreen } from '../screens/Point/Add'
import { Account as AccountScreen } from '../screens/Account'
import { ItemsProvider } from '../service/context/items-context'
import { colors } from '../styles/colors'

const Stack = createStackNavigator()
const MapScreenRender = (): JSX.Element => (
  <ItemsProvider>
    <MapScreen />
  </ItemsProvider>
)

export const AppRoutes: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Maps"
        component={MapScreenRender}
      />
      <Stack.Screen
        options={() => ({
          title: '',
          headerTintColor: colors.primary,
          headerTransparent: true
        })}
        name="AddPoint"
        component={AddPointScreen}
      />
      <Stack.Screen
        options={() => ({
          title: '',
          headerTintColor: colors.primary,
          headerTransparent: true
        })}
        name="Account"
        component={AccountScreen}
      />
    </Stack.Navigator>
  </NavigationContainer>
)
