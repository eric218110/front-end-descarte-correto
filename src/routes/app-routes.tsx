import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Home as HomeScreen } from '../screens/Home'
import { Map as MapScreen } from '../screens/Map'
import { AddPoint as AddPointScreen } from '../screens/Point/Add'
import { ItemsProvider } from '../service/context/items-context'

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
        options={{ headerShown: false }}
        name="AddPoint"
        component={AddPointScreen}
      />
    </Stack.Navigator>
  </NavigationContainer>
)
