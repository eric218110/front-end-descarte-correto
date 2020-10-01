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
  IconLinkDetailsPoint,
  ActionIconCloseDirection
} from './styles'
import * as Location from 'expo-location'
import { Alert, StatusBar } from 'react-native'
import { colors } from '../../styles/colors'
import { Header } from '../../components/Header'
import { Filter } from '../../components/Item/Filter'
import { Loading } from '../../components/Loading'
import { Modalize } from 'react-native-modalize'
import { Item } from '../../components/Item'
import MapView, { Marker, Callout } from 'react-native-maps'
import { useNavigation } from '@react-navigation/native'
import { useItemsContext } from '../../service/context/items-context'
import { usePointContext } from '../../service/context/point-context'
import {
  DirectionsProps,
  DestinationMapsComponent
} from '../../components/Destination'

export type DestinationPropsCallBackDetailsPoint = Omit<
  DirectionsProps,
  'origin'
>

type IState = {
  latitude: number
  longitude: number
}

export const Map: React.FC = () => {
  const [directionEnable, setDirectionEnable] = useState<DirectionsProps>(
    {} as DirectionsProps
  )

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

  useEffect(() => {
    setDirectionEnable({
      origin: {
        latitude: 0,
        longitude: 0
      },
      destination: {
        longitude: 0,
        latitude: 0
      }
    })
  }, [])

  const { getItemsSelected } = useItemsContext()
  const { points } = usePointContext()
  const navigation = useNavigation()
  const itemsSelected = getItemsSelected()
  const modalRefFilterItems = useRef<Modalize>(null)
  const mapRef = useRef<MapView>(null)

  const handleCloseNavigationDirection = useCallback(() => {
    setDirectionEnable({
      origin: {
        latitude: 0,
        longitude: 0
      },
      destination: {
        longitude: 0,
        latitude: 0
      }
    })
  }, [directionEnable])

  const handleOnOpenModalFilterItems = () => {
    modalRefFilterItems.current?.open()
  }

  const handleDirectionCallBack = useCallback(
    ({ destination }: DestinationPropsCallBackDetailsPoint) => {
      async function setDestination() {
        const location = await Location.getCurrentPositionAsync({})
        const { latitude, longitude } = location.coords
        setDirectionEnable({
          origin: {
            latitude,
            longitude
          },
          destination
        })
      }
      setDestination()
    },
    [directionEnable]
  )

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
              ref={mapRef}
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
              {directionEnable.origin.latitude !== 0 && (
                <DestinationMapsComponent
                  destination={directionEnable.destination}
                  origin={directionEnable.origin}
                  onReady={() =>
                    mapRef.current?.fitToCoordinates(
                      [
                        {
                          latitude: directionEnable.origin.latitude,
                          longitude: directionEnable.origin.longitude
                        },
                        {
                          latitude: directionEnable.destination.latitude,
                          longitude: directionEnable.destination.longitude
                        }
                      ],
                      { animated: true }
                    )
                  }
                />
              )}
              {console.log(itemsSelected)}
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
                          navigation.navigate('DetailsPoint', {
                            id,
                            handleDirectionCallBack
                          })
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
        {directionEnable.origin.latitude !== 0 && (
          <ContentAction onPress={handleCloseNavigationDirection}>
            <ActionIconCloseDirection />
          </ContentAction>
        )}
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
