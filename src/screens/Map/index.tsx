import React, { useEffect, useRef, useState } from 'react'
import {
  Wrapper,
  Container,
  MapViewContainer,
  ModalizeContainer,
  ContainerAction,
  ContentAction,
  ActionIconFilter,
  ActionIconFixLocation,
  ActionIconAddPoint
} from './styles'
import * as Location from 'expo-location'
import { ActivityIndicator, Alert, StatusBar, View } from 'react-native'
import { colors } from '../../styles/colors'
import { Header } from '../../components/Header'
import { Modalize } from 'react-native-modalize'
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

  const modalRefFilterItems = useRef<Modalize>(null)

  const handleOnOpenModalFilterItems = () => {
    modalRefFilterItems.current?.open()
  }

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
      <ContainerAction>
        <ContentAction onPress={handleOnOpenModalFilterItems}>
          <ActionIconFilter />
        </ContentAction>
        <ContentAction>
          <ActionIconFixLocation />
        </ContentAction>
        <ContentAction>
          <ActionIconAddPoint />
        </ContentAction>
      </ContainerAction>
      <ModalizeContainer ref={modalRefFilterItems} />
    </Wrapper>
  )
}
