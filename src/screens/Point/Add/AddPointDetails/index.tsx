import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Form } from '@unform/mobile'
import { Button } from '../../../../components/Button'
import { Input } from '../../../../components/Input'
import * as Yup from 'yup'
import {
  Container,
  ImageContainer,
  ContentPhotoPreview,
  ContentIconCamera,
  IconCamera,
  ContentMain,
  Body,
  DescriptionText,
  ContentItems,
  ListItems,
  IconTextInput,
  Bottom,
  ContentLeft,
  DescriptionContentRightText,
  HelpContainer,
  HelpText,
  ContentRight,
  IconDeletePhotoContainer,
  IconDeletePhoto
} from './styles'
import { useItemsContext } from '../../../../service/context/items-context'
import getValidationErrorsYup from '../../../../utils/getValidationErrorYup'
import { AlertAnimated } from '../../../../components/Alert'
import { colors } from '../../../../styles/colors'
import { Filter } from '../../../../components/Item/Filter'
import { FormHandles } from '@unform/core'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import { StatusBar } from 'react-native'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { AddressFormData } from '../AddPoint'

type DetailsPointFormData = {
  titlePoint: string
  file: string
  items: string[]
  city: string
  latitude: string
  longitude: string
  neighborhood: string
  referencePoint: string
  state: string
  street: string
  zipCode: string
}

type ErrorAlert = {
  active: boolean
  title: string
  description: string
}

type AddressFormDataScreenProps = RouteProp<
  Record<'AddressFormData', AddressFormData>,
  'AddressFormData'
>

export const AddPointDetails: React.FC = () => {
  const { params } = useRoute<AddressFormDataScreenProps>()
  const { goBack } = useNavigation()
  const formRef = useRef<FormHandles>(null)
  const { items } = useItemsContext()
  const [loading, setLoading] = useState<boolean>(false)
  const [hasPermissionCamera, setHasPermissionCamera] = useState<boolean>(true)
  const [dataImageUri, setDataImageUri] = useState<string>('')
  const [itemsSelecteds, setItemsSelecteds] = useState<string[]>([])
  const [alert, setActiveAlert] = useState<ErrorAlert>({} as ErrorAlert)
  const handleButtonCreatePoint = useCallback(
    async (data: DetailsPointFormData) => {
      setLoading(true)
      try {
        formRef.current?.setErrors({})
        const schemasYup = Yup.object().shape({
          title: Yup.string().required('Campo titulo é obrigatório')
        })

        await schemasYup.validate(data, {
          abortEarly: false
        })

        if (itemsSelecteds.length === 0) {
          setActiveAlert({
            active: true,
            description: 'Selecione no mínimo 1 item para coleta',
            title: 'Nenhum item selecionado'
          })
          setTimeout(() => {
            setActiveAlert({
              active: false,
              description: '',
              title: ''
            })
          }, 5000)
          return ''
        }
        if (dataImageUri === '') {
          setActiveAlert({
            active: true,
            description: 'É preciso enviar uma foto do local',
            title: 'Foto não encontrada'
          })
          setTimeout(() => {
            setActiveAlert({
              active: false,
              description: '',
              title: ''
            })
          }, 5000)
          return ''
        }

        console.log('CREATE NEW POINT')
        data.city = params.city
        data.latitude = params.latitude
        data.longitude = params.longitude
        data.neighborhood = params.neighborhood
        data.referencePoint = params.referencePoint
        data.street = params.street
        data.zipCode = params.zipCode
        data.file = dataImageUri
        data.items = itemsSelecteds
        console.log(data)

        setLoading(false)
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrorsYup(error)
          formRef.current?.setErrors(errors)
          setLoading(false)
          return ''
        }
      }
    },
    [itemsSelecteds, dataImageUri]
  )

  useEffect(() => {
    if (!params) goBack()
    setActiveAlert({
      active: false,
      description: '',
      title: ''
    })
  }, [])

  useEffect(() => {
    const itemsSelected = items
      .filter(element => element.active)
      .map(items => items.id)
    setItemsSelecteds(itemsSelected)
  }, [items])

  useEffect(() => {
    async function getPermission() {
      const { status } = await Permissions.askAsync(Permissions.CAMERA)
      if (status !== 'granted') {
        setActiveAlert({
          active: true,
          description: 'Não foi possível ter acesso a câmera',
          title: 'Permissão negada'
        })
        setTimeout(() => {
          setActiveAlert({
            active: false,
            description: '',
            title: ''
          })
        }, 5000)
        setHasPermissionCamera(false)
      }
    }
    getPermission()
  }, [])

  const handleClickButtonCamera = useCallback(async () => {
    if (hasPermissionCamera) {
      const photo = await ImagePicker.launchCameraAsync()
      if (!photo.cancelled) {
        setDataImageUri(photo.uri)
      }
    }
  }, [dataImageUri])

  const handleButtonDeletePhoto = useCallback(() => {
    setDataImageUri('')
    setActiveAlert({
      active: true,
      description: 'Arquivo de imagem deletada',
      title: 'Foto deletada'
    })
    setTimeout(() => {
      setActiveAlert({
        active: false,
        description: '',
        title: ''
      })
    }, 5000)
  }, [])

  return (
    <Container>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      {dataImageUri === '' ? (
        <ImageContainer>
          <ContentIconCamera onPress={handleClickButtonCamera}>
            <IconCamera />
          </ContentIconCamera>
        </ImageContainer>
      ) : (
        <ContentPhotoPreview source={{ uri: dataImageUri }}>
          <IconDeletePhotoContainer onPress={handleButtonDeletePhoto}>
            <IconDeletePhoto on />
          </IconDeletePhotoContainer>
        </ContentPhotoPreview>
      )}
      <Form
        ref={formRef}
        style={{ height: '70%' }}
        onSubmit={handleButtonCreatePoint}
      >
        <ContentMain>
          <Body>
            <DescriptionText>detalhes do ponto de descarte</DescriptionText>
            <ContentItems>
              <Input placeholder="Titulo" name="title" Icon={IconTextInput} />
              <ListItems>
                <Filter title="Selecione os items" />
              </ListItems>
            </ContentItems>
          </Body>
          <Bottom>
            <ContentLeft>
              <DescriptionContentRightText>
                preencha todos os campos
              </DescriptionContentRightText>
              <HelpContainer>
                <HelpText>ajuda?</HelpText>
              </HelpContainer>
            </ContentLeft>
            <ContentRight>
              <Button
                loading={loading}
                onPress={() => {
                  formRef.current?.submitForm()
                }}
                style={{ width: '100%' }}
                text="cadastrar"
              />
            </ContentRight>
          </Bottom>
        </ContentMain>
      </Form>
      {alert.active && (
        <AlertAnimated
          title={alert.title}
          description={alert.description}
          backgroundColor={colors.actions.error.light}
          colorActions={colors.actions.error.dark}
          iconName="alert"
        />
      )}
    </Container>
  )
}
