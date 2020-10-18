import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import { ResponseListPoints, getOnePointApi } from '../../../service/api/points'
import { Loading } from '../../../components/Loading'
import { AlertAnimated } from '../../../components/Alert'
import { StatusBar } from 'react-native'
import * as Location from 'expo-location'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DestinationPropsCallBackDetailsPoint } from '../../Map/index'
import {
  HeaderImageScrollViewStyled,
  Container,
  ContainerMap,
  ContainerActionRouteButton,
  IconActionRouteButton,
  MapViewContainer,
  MapViewStyled,
  TextDirectionMap,
  TextDirectionMapContainer,
  TextDistance,
  ContainerItems,
  ContainerItem,
  LeftContainer,
  ContainerText,
  Title,
  TitleDescription,
  ContainerFooter,
  TextNamePoint,
  ContainerListItem,
  HeaderContainer
} from './styles'
import { Point } from '../../../components/Point'
import { Marker } from 'react-native-maps'
import * as geolib from 'geolib'

type PointDataScreenParams = RouteProp<
  Record<
    'PointDataScreenParams',
    {
      id: string
      handleDirectionCallBack: ({
        destination
      }: DestinationPropsCallBackDetailsPoint) => void
    }
  >,
  'PointDataScreenParams'
>

type ErrorAlert = {
  active: boolean
  title: string
  description: string
}

type LocationProps = {
  latitude: number
  longitude: number
}

export const DetailsPoint = (): JSX.Element => {
  const { id, handleDirectionCallBack } = useRoute<
    PointDataScreenParams
  >().params
  const { goBack } = useNavigation()
  const [point, setPoint] = useState<ResponseListPoints | null>(null)
  const [alert, setActiveAlert] = useState<ErrorAlert>({} as ErrorAlert)
  const [locationUser, setLocationUser] = useState<LocationProps>({
    latitude: 0,
    longitude: 0
  })

  useEffect(() => {
    if (!id) goBack()
    setActiveAlert({
      active: false,
      description: '',
      title: ''
    })
  }, [])

  useEffect(() => {
    async function getPointWitId() {
      const { data } = await getOnePointApi({ id })
      if (data) {
        setPoint(data)
      } else {
        handleAlertError({
          description: 'Não foi possivel listar o ponto',
          title: 'Erro ao listar'
        })
        setTimeout(() => {
          goBack()
        }, 5500)
      }
    }
    getPointWitId()
  }, [])

  useEffect(() => {
    async function getLocation() {
      const location = await Location.getCurrentPositionAsync()
      const { latitude, longitude } = location.coords
      setLocationUser({ longitude, latitude })
    }
    getLocation()
  }, [])

  const handleAlertError = useCallback(
    ({ description, title }: { description: string; title: string }) => {
      setActiveAlert({
        active: true,
        description,
        title
      })
      setTimeout(() => {
        setActiveAlert({
          active: false,
          description: '',
          title: ''
        })
      }, 5000)
      return ''
    },
    [alert]
  )

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <HeaderImageScrollViewStyled headerImage={{ uri: point?.image }}>
        <Container>
          {point ? (
            <>
              <ContainerMap>
                <HeaderContainer>
                  <TextNamePoint>{point.name}</TextNamePoint>
                  <TextDirectionMapContainer
                    onPress={() => {
                      if (handleDirectionCallBack) {
                        handleDirectionCallBack({
                          destination: {
                            latitude: Number(point?.latitude),
                            longitude: Number(point?.longitude)
                          }
                        })
                        goBack()
                      }
                    }}
                  >
                    <TextDirectionMap>Ir ao local</TextDirectionMap>
                  </TextDirectionMapContainer>
                </HeaderContainer>
                <MapViewContainer>
                  <MapViewStyled
                    region={{
                      longitudeDelta: 0.008,
                      latitudeDelta: 0.008,
                      longitude: Number(point.longitude),
                      latitude: Number(point.latitude)
                    }}
                  >
                    <Marker
                      coordinate={{
                        latitude: Number(point.latitude),
                        longitude: Number(point.longitude)
                      }}
                    >
                      <Point />
                    </Marker>
                  </MapViewStyled>
                </MapViewContainer>
                <TextDistance>{`${
                  geolib.getPreciseDistance(
                    {
                      latitude: point.latitude,
                      longitude: point.longitude
                    },
                    {
                      latitude: locationUser.latitude,
                      longitude: locationUser.longitude
                    }
                  ) / 1000
                } km até o local de descarte`}</TextDistance>
              </ContainerMap>
              <ContainerItems>
                <ContainerListItem>
                  {point.items.map(item => (
                    <ContainerItem key={item.id}>
                      <LeftContainer color={item.activeColor} />
                      <ContainerText>
                        <Title>{item.title}</Title>
                        <TitleDescription>
                          Teste Name point Description
                        </TitleDescription>
                      </ContainerText>
                    </ContainerItem>
                  ))}
                </ContainerListItem>
              </ContainerItems>
              <ContainerFooter />
            </>
          ) : (
            <Loading />
          )}
        </Container>
      </HeaderImageScrollViewStyled>
      <ContainerActionRouteButton
        onPress={() => {
          if (handleDirectionCallBack) {
            handleDirectionCallBack({
              destination: {
                latitude: Number(point?.latitude),
                longitude: Number(point?.longitude)
              }
            })
            goBack()
          }
        }}
      >
        <IconActionRouteButton />
      </ContainerActionRouteButton>
      {alert.active && (
        <AlertAnimated
          title={alert.title}
          description={alert.description}
          backgroundColor={'#f05545'}
          colorActions={'#7f0000'}
          iconName="alert"
        />
      )}
    </>
  )
}
