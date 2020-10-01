import React, { useCallback, useEffect, useRef, useState } from 'react'
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
  ItemsListContainer,
  ContainerCallout,
  ContainerCalloutText,
  TextCallout,
  DividerCallout,
  IconLinkDetailsPoint
} from './styles'
import * as Location from 'expo-location'
import { Alert, StatusBar } from 'react-native'
import { colors } from '../../styles/colors'
import { Header } from '../../components/Header'
import { Filter } from '../../components/Item/Filter'
import { Loading } from '../../components/Loading'
import { Modalize } from 'react-native-modalize'
import { Item } from '../../components/Item'
import { Marker, Callout } from 'react-native-maps'
import { useNavigation } from '@react-navigation/native'
import { useItemsContext } from '../../service/context/items-context'
import { usePointContext } from '../../service/context/point-context'

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
  const { getItemsSelected } = useItemsContext()
  const { points } = usePointContext()
  const navigation = useNavigation()
  const itemsSelected = getItemsSelected()

  const modalRefFilterItems = useRef<Modalize>(null)

  const handleOnOpenModalFilterItems = () => {
    modalRefFilterItems.current?.open()
  }

  const handleNavigateAddPoint = useCallback(() => {
    navigation.navigate('AddPoint')
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
              showsMyLocationButton={false}
              showsTraffic={false}
              showsCompass={false}
              showsBuildings={false}
              showsIndoors={false}
              showsScale={false}
              showsIndoorLevelPicker={false}
              showsPointsOfInterest={false}
              initialRegion={{
                latitude: initialLocation.latitude,
                longitude: initialLocation.longitude,
                latitudeDelta: 0.014,
                longitudeDelta: 0.014
              }}
            >
              {points.length > 0 &&
                points.map(({ id, latitude, longitude, name }) => (
                  <Marker
                    key={id}
                    coordinate={{
                      latitude: Number(latitude),
                      longitude: Number(longitude)
                    }}
                    image={require('../../assets/icon-make.png')}
                  >
                    <Callout
                      onPress={event => {
                        if (event.nativeEvent.action === 'callout-press') {
                          navigation.navigate('DetailsPoint', { id })
                        }
                      }}
                    >
                      <ContainerCallout>
                        <ContainerCalloutText>
                          <TextCallout>{name}</TextCallout>
                        </ContainerCalloutText>
                        <DividerCallout />
                        <IconLinkDetailsPoint />
                      </ContainerCallout>
                    </Callout>
                  </Marker>
                ))}
            </MapViewContainer>
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
        <ContentAction onPress={handleNavigateAddPoint}>
          <ActionIconAddPoint />
        </ContentAction>
      </ContainerAction>
      <ModalizeContainer ref={modalRefFilterItems}>
        <Filter title="Filtre os items" />
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
