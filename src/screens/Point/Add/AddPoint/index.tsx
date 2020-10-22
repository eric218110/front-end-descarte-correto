import React, { useCallback, useEffect, useRef, useState } from 'react'
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
  IconPlacePoint,
  HelpContainer,
  PickerStyled,
  PickerStyledContainer,
  InputStyled,
  PickerText,
  PickerStyledContainerItems,
  ReferencePoint
} from './styles'
import { Loading } from '../../../../components/Loading'
import { Alert } from 'react-native'
import { CircleButton } from '../../../../components/Button'
import { FormHandles } from '@unform/core'
import getValidationErrorsYup from '../../../../utils/getValidationErrorYup'
import { useNavigation } from '@react-navigation/native'
import * as Location from 'expo-location'
import * as Yup from 'yup'
import { Point } from '../../../../service/domain/point'

export interface AddressFormData
  extends Omit<Point, 'id' | 'image' | 'items' | 'account'> {
  items?: Array<string>
  account?: string
}

export const AddPoint = (): JSX.Element => {
  const [initialLocation, setInitialLocation] = useState<{
    latitude: number
    longitude: number
  }>({
    latitude: 0,
    longitude: 0
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<string>('Empresa')
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

  const onSubmitNextCreatePointScreen = useCallback(
    async (data: AddressFormData) => {
      try {
        setLoading(true)
        formRef.current?.setErrors({})
        const schemasYup = Yup.object().shape({
          placeName: Yup.string().required(
            'Nome do estabelecimento é obrigatório'
          ),
          referencePoint: Yup.string().required(
            'Campo ponto de referência é obrigatório'
          )
        })

        await schemasYup.validate(data, {
          abortEarly: false
        })
        setLoading(false)
        const addressParams: AddressFormData = {
          referencePoint: data.referencePoint,
          placeName: data.placeName,
          locationType: selectedItem,
          longitude: String(initialLocation.longitude),
          latitude: String(initialLocation.latitude)
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
    [initialLocation]
  )

  const handleChangePickerItem = useCallback(
    (itemValue: string | number) => {
      setSelectedItem(String(itemValue))
    },
    [selectedItem]
  )

  return (
    <Container>
      {initialLocation.latitude !== 0 ? (
        <>
          <ContainerMap>
            <MapViewStyled
              initialRegion={{
                latitude: initialLocation.latitude,
                longitude: initialLocation.longitude,
                latitudeDelta: 0.008,
                longitudeDelta: 0.008
              }}
            />
          </ContainerMap>
          <Content>
            <Form ref={formRef} onSubmit={onSubmitNextCreatePointScreen}>
              <Body>
                <InputGroup>
                  <>
                    <InputStyled
                      placeholder="Nome do estabelecimento"
                      Icon={IconPlacePoint}
                      name={'placeName'}
                      autoCapitalize="words"
                      returnKeyType="send"
                      onSubmitEditing={() => formRef.current?.submitForm()}
                    />
                    <InputStyled
                      placeholder="Ponto de referencia do ponto"
                      Icon={ReferencePoint}
                      name={'referencePoint'}
                      autoCapitalize="words"
                      returnKeyType="send"
                      onSubmitEditing={() => formRef.current?.submitForm()}
                    />
                    <PickerStyledContainer>
                      <PickerText>
                        Selecione o tipo do estabelecimento
                      </PickerText>
                      <PickerStyledContainerItems>
                        <PickerStyled
                          selectedValue={selectedItem}
                          onValueChange={handleChangePickerItem}
                          style={{
                            borderRadius: 10
                          }}
                        >
                          <PickerStyled.Item label="Empresa" value="Empresa" />
                          <PickerStyled.Item
                            label="Faculdade"
                            value="Faculdade"
                          />
                          <PickerStyled.Item
                            label="Orgão público"
                            value="Orgão público"
                          />
                          <PickerStyled.Item
                            label="Praça ou locais aberto"
                            value="Praça ou locais aberto"
                          />
                          <PickerStyled.Item
                            label="Shopping"
                            value="Shopping"
                          />
                          <PickerStyled.Item
                            label="Condomínios"
                            value="Condomínios"
                          />
                          <PickerStyled.Item label="Casa" value="Casa" />
                        </PickerStyled>
                      </PickerStyledContainerItems>
                    </PickerStyledContainer>
                  </>
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
