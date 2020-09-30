import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Input } from '../../../../components/Input'
import { Form } from '@unform/mobile'
import {
  Container,
  ContainerMap,
  MapViewStyled,
  Content,
  Body,
  InputGroup,
  Bottom,
  ContentLeft,
  Title,
  HelpText,
  NextIcon,
  IconLocation,
  DirectionLocation,
  HelpContainer
} from './styles'
import * as Location from 'expo-location'
import { Loading } from '../../../../components/Loading'
import { Alert } from 'react-native'
import { CircleButton } from '../../../../components/Button'
import * as Yup from 'yup'
import {
  geoLocationApi,
  AddressComponentsData
} from '../../../../service/api/geoLocation'
import { FormHandles } from '@unform/core'
import getValidationErrorsYup from '../../../../utils/getValidationErrorYup'
import { useNavigation } from '@react-navigation/native'

export type AddressFormData = {
  reference: string
  street: string
  neighborhood: string
  state: string
  city: string
  zipCode: string
  latitude: string
  longitude: string
}

export const AddPoint = (): JSX.Element => {
  const [initialLocation, setInitialLocation] = useState<{
    latitude: number
    longitude: number
  }>({
    latitude: 0,
    longitude: 0
  })
  const [address, setAddress] = useState<AddressComponentsData>(
    {} as AddressComponentsData
  )
  const [loading, setLoading] = useState<boolean>(false)
  const formRef = useRef<FormHandles>(null)
  const navigator = useNavigation()

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
    async function getAddressComponents() {
      if (initialLocation.latitude !== 0) {
        const currentLocation = await geoLocationApi({
          latitude: String(initialLocation.latitude),
          longitude: String(initialLocation.longitude)
        })
        setAddress(currentLocation)
      }
    }

    getAddressComponents()
  }, [initialLocation])

  const onSubmitNextCreatePointScreen = useCallback(
    async (data: AddressFormData) => {
      try {
        setLoading(true)
        formRef.current?.setErrors({})
        const schemasYup = Yup.object().shape({
          reference: Yup.string().required(
            'Campo ponto de referência é obrigatório'
          )
        })

        await schemasYup.validate(data, {
          abortEarly: false
        })
        setLoading(false)
        const addressParams: AddressFormData = {
          reference: data.reference,
          ...address
        }
        navigator.navigate('AddPointDetails', addressParams)
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrorsYup(error)
          formRef.current?.setErrors(errors)
          setLoading(false)
          return ''
        }
      }
    },
    [address]
  )
  return (
    <Container>
      {initialLocation.latitude !== 0 ? (
        <>
          <ContainerMap>
            <MapViewStyled
              showsUserLocation
              showsMyLocationButton={false}
              showsTraffic={false}
              showsCompass={false}
              showsBuildings={false}
              showsIndoors={false}
              showsScale={false}
              showsIndoorLevelPicker={false}
              showsPointsOfInterest={false}
              zoomEnabled={false}
              scrollEnabled={false}
              initialRegion={{
                latitude: initialLocation.latitude,
                longitude: initialLocation.longitude,
                latitudeDelta: 0.014,
                longitudeDelta: 0.014
              }}
            />
          </ContainerMap>
          <Content>
            <Form ref={formRef} onSubmit={onSubmitNextCreatePointScreen}>
              <Body>
                <InputGroup>
                  {address.street ? (
                    <>
                      <Input
                        placeholder="ponto de referência"
                        Icon={DirectionLocation}
                        name={'reference'}
                        autoCapitalize="words"
                        returnKeyType="send"
                        onSubmitEditing={() => formRef.current?.submitForm()}
                      />
                      <Input
                        value={address.street}
                        editable={false}
                        Icon={IconLocation}
                        name={'street'}
                      />
                      <Input
                        value={address.neighborhood}
                        editable={false}
                        Icon={IconLocation}
                        name={'neighborhood'}
                      />
                      <Input
                        value={address.city}
                        editable={false}
                        Icon={IconLocation}
                        name={'city'}
                      />
                      <Input
                        value={address.state}
                        editable={false}
                        Icon={IconLocation}
                        name={'state'}
                      />
                    </>
                  ) : (
                    <Loading />
                  )}
                </InputGroup>
              </Body>
              <Bottom>
                <ContentLeft>
                  <Title>DADOS DA LOCALIZAÇÃO DO PONTO DE DESCARTE</Title>
                  <HelpContainer>
                    <HelpText>AJUDA?</HelpText>
                  </HelpContainer>
                </ContentLeft>
                <CircleButton
                  onPress={() => {
                    formRef.current?.submitForm()
                  }}
                  loading={loading}
                  Icon={NextIcon}
                />
              </Bottom>
            </Form>
          </Content>
        </>
      ) : (
        <Loading />
      )}
    </Container>
  )
}
