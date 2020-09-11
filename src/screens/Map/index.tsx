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
  TextItem
} from './styles'
import MapView from 'react-native-maps'
import * as Location from 'expo-location'
import { Alert, StatusBar } from 'react-native'
import { colors } from '../../styles/colors'

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

      const location = await Location.getCurrentPositionAsync()

      const { latitude, longitude } = location.coords

      setInitialLocation({ latitude, longitude })
    }

    loadPosition()
  }, [])

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
            <MapView
              style={{ width: '100%', height: '100%' }}
              initialRegion={{
                latitude: initialLocation.latitude,
                longitude: initialLocation.longitude,
                latitudeDelta: 0.014,
                longitudeDelta: 0.014
              }}
            ></MapView>
          )}
        </MapContent>
        <Bottom>
          <ContentBottom>
            <Items>
              <Item activeColor="#702323" color="#CEB4B4" first>
                <IconItem source={require('../../assets/image-item.png')} />
                <TextItem numberOfLines={1} color="#702323">
                  Any item
                </TextItem>
              </Item>
              <Item activeColor="#072602" color="#9DB791">
                <IconItem source={require('../../assets/image-item-2.png')} />
                <TextItem numberOfLines={1} color="#072602">
                  Any item
                </TextItem>
              </Item>
              <Item activeColor="#2E3192" color="#BBBDD3">
                <IconItem source={require('../../assets/image-item-3.png')} />
                <TextItem numberOfLines={1} color="#2E3192">
                  Any item
                </TextItem>
              </Item>
              <Item activeColor="#6D7D0C" color="#DBEC71">
                <IconItem source={require('../../assets/image-item-4.png')} />
                <TextItem numberOfLines={1} color="#6D7D0C">
                  Any item
                </TextItem>
              </Item>
            </Items>
          </ContentBottom>
        </Bottom>
      </Container>
    </Wrapper>
  )
}
