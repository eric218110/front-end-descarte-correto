import React, { useEffect, useState } from 'react'
import {
  Wrapper,
  Container,
  MapViewContainer,
  IconsListContainer
} from './styles'
import * as Location from 'expo-location'
import { ActivityIndicator, Alert, StatusBar, View } from 'react-native'
import { colors } from '../../styles/colors'
import { Header } from '../../components/Header'
import { Action } from '../../components/Actions'
import { Item } from '../../components/Item'
import { getItemsApi } from '../../service/api/items'
type IState = {
  latitude: number
  longitude: number
}

export const Map: React.FC = () => {
  const [initialLocation, setInitialLocation] = useState<IState>({
    latitude: 0,
    longitude: 0
  })

  useEffect(() => {
    async function setItems() {
      console.log(await getItemsApi())
    }
    setItems()
  }, [])

  useEffect(() => {
    async function loadPosition() {
      const { status } = await Location.requestPermissionsAsync()

      if (status !== 'granted') {
        Alert.alert('Error', 'Permission location')
        return
      }

      const location = await Location.getCurrentPositionAsync({})
      const { latitude, longitude } = location.coords
      setInitialLocation({ latitude, longitude })
    }

    loadPosition()
  }, [])

  return (
    <Wrapper>
      <StatusBar backgroundColor={colors.background} />
      <Header />
      <Container>
        {initialLocation.latitude !== 0 ? (
          <>
            <MapViewContainer
              showsUserLocation
              initialRegion={{
                latitude: initialLocation.latitude,
                longitude: initialLocation.longitude,
                latitudeDelta: 0.014,
                longitudeDelta: 0.014
              }}
            ></MapViewContainer>
          </>
        ) : (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator size={45} animating />
          </View>
        )}
      </Container>
      <Action />
      <IconsListContainer>
        <Item colorBackground="#072602" name="battery" />
        <Item colorBackground="#19225E" name="canned" />
        <Item colorBackground="#BC225C" name="canned" />
        <Item colorBackground="#FD9154" name="canned" />
      </IconsListContainer>
    </Wrapper>
  )
}
