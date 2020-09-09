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
              <Item color="#dd3d42" first>
                <IconItem />
                <TextItem numberOfLines={1} color="#dd3d42">
                  Any item
                </TextItem>
              </Item>
              <Item color="#e4e3e3">
                <IconItem />
                <TextItem numberOfLines={1} color="#e4e3e3">
                  Any item
                </TextItem>
              </Item>
              <Item color="#c9a9a8">
                <IconItem />
                <TextItem numberOfLines={1} color="#c9a9a8">
                  Any item
                </TextItem>
              </Item>
              <Item color="#c3d4a4">
                <IconItem />
                <TextItem numberOfLines={1} color="#c3d4a4">
                  Any item
                </TextItem>
              </Item>
              <Item color="#b4b4b4">
                <IconItem />
                <TextItem numberOfLines={1} color="#b4b4b4">
                  Any item
                </TextItem>
              </Item>
              <Item color="#e4c3d1">
                <IconItem />
                <TextItem numberOfLines={1} color="#e4c3d1">
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
