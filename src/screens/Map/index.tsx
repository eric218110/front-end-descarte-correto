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
  ActionIconAddPoint,
  ItemsListContainer
} from './styles'
import * as Location from 'expo-location'
import { Alert, StatusBar } from 'react-native'
import { colors } from '../../styles/colors'
import { Header } from '../../components/Header'
import { Filter } from '../../components/Item/Filter'
import { Loading } from '../../components/Loading'
import { Modalize } from 'react-native-modalize'
import { useItemsContext } from '../../service/context/items-context'
import { Item } from '../../components/Item'
type IState = {
  latitude: number
  longitude: number
}

export const Map: React.FC = () => {
  const [initialLocation, setInitialLocation] = useState<IState>({
    latitude: 0,
    longitude: 0
  })

  const { getItemsSelected } = useItemsContext()
  const itemsSelected = getItemsSelected()

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
          <Loading />
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
      <ModalizeContainer ref={modalRefFilterItems}>
        <Filter />
      </ModalizeContainer>
      <ItemsListContainer>
        {itemsSelected.map(({ id, title, active, activeColor }) =>
          active ? (
            <Item name={title} key={id} colorBackground={activeColor} />
          ) : null
        )}
      </ItemsListContainer>
    </Wrapper>
  )
}
