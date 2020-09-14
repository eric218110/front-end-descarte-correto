/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'

import {
  Wrapper,
  Container,
  Header,
  Avatar,
  IconAvatar,
  ImageUser,
  ActiveIcon,
  TextAvatar,
  ExitAppActionIconContent,
  ExitAppActionIcon,
  MapContent,
  Bottom,
  ContentBottom,
  Items,
  Item,
  IconItem,
  TextItem,
  MarkerWrapper,
  MarkerLocation
} from './styles'
import MapView from 'react-native-maps'
import * as Location from 'expo-location'
import { Alert, StatusBar } from 'react-native'
import { colors } from '../../styles/colors'
import api from '../../service/api'
import LocationIcon from '../../assets/location.svg'
type IState = {
  latitude: number
  longitude: number
}

type IStateItems = {
  id: string
  title: string
  image: string
  color: string
  activeColor: string
}

export const Map: React.FC = () => {
  const [initialLocation, setInitialLocation] = useState<IState>({
    latitude: 0,
    longitude: 0
  })

  const [items, setItems] = useState<IStateItems[]>([] as IStateItems[])

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
    async function getItems() {
      await api.get<IStateItems[]>('item').then(({ data }) => {
        setItems(data)
      })
    }
    getItems()
  }, [items])

  return (
    <Wrapper>
      <StatusBar backgroundColor={colors.background} />
      <Container>
        <Header>
          <Avatar>
            <IconAvatar>
              <ImageUser source={require('../../assets/user.jpeg')} />
              <ActiveIcon />
            </IconAvatar>
            <TextAvatar>Any user name</TextAvatar>
          </Avatar>
          <ExitAppActionIconContent>
            <ExitAppActionIcon />
          </ExitAppActionIconContent>
        </Header>
        <MapContent>
          {initialLocation.latitude !== 0 && (
            <>
              <MapView
                style={{ width: '100%', height: '100%' }}
                initialRegion={{
                  latitude: initialLocation.latitude,
                  longitude: initialLocation.longitude,
                  latitudeDelta: 0.014,
                  longitudeDelta: 0.014
                }}
              >
                <MarkerWrapper
                  coordinate={{
                    latitude: initialLocation.latitude,
                    longitude: initialLocation.longitude
                  }}
                >
                  <MarkerLocation>
                    <LocationIcon/>
                  </MarkerLocation>
                </MarkerWrapper>
              </MapView>

            </>
          )}
        </MapContent>
        <Bottom>
          <ContentBottom>
            <Items>
              {items.map(({ id, activeColor, color, image, title }) => {
                return (
                  <Item
                    key={id}
                    activeColor={activeColor}
                    color={color}
                  >
                    <IconItem source={{ uri: image }} />
                    <TextItem numberOfLines={1} color={activeColor}>
                      {title}
                    </TextItem>
                  </Item>
                )
              })}
            </Items>
          </ContentBottom>
        </Bottom>
      </Container>
    </Wrapper>
  )
}
