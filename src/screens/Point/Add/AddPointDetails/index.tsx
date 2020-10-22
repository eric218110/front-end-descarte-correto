import React, { useCallback, useEffect, useRef, useState } from 'react'
import Modal from 'react-native-modal'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import { Button } from '../../../../components/Button'
import { useItemsContext } from '../../../../service/context/items-context'
import { AlertAnimated } from '../../../../components/Alert'
import { Filter } from '../../../../components/Item/Filter'
import { FormHandles } from '@unform/core'
import { StatusBar } from 'react-native'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { AddressFormData } from '../AddPoint'
import { usePointContext } from '../../../../service/context/point-context'
import { useAccountContext } from '../../../../service/context/account-context'
import {
  Container,
  ImageContainer,
  ContentPhotoPreview,
  ContentIconCamera,
  IconCamera,
  Body,
  ListItems,
  Bottom,
  ContentLeft,
  DescriptionContentRightText,
  HelpContainer,
  HelpText,
  ContentRight,
  IconDeletePhotoContainer,
  IconDeletePhoto,
  ModalContent,
  ModalSuccessText,
  ModalContentSVG,
  ContentCheckLottie,
  ModalContentBottom,
  ModalContentText,
  ModalSuccessTextDescription,
  ModalContentButton,
  FormContent
} from './styles'

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
  const formRef = useRef<FormHandles>(null)
  const { params } = useRoute<AddressFormDataScreenProps>()
  const { goBack, navigate } = useNavigation()
  const { items } = useItemsContext()
  const { addPoint } = usePointContext()
  const { getAccount } = useAccountContext()
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [hasPermissionCamera, setHasPermissionCamera] = useState<boolean>(true)
  const [dataImageUri, setDataImageUri] = useState<string>('')
  const [itemsSelecteds, setItemsSelecteds] = useState<string>('')
  const [alert, setActiveAlert] = useState<ErrorAlert>({} as ErrorAlert)

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
      .join(',')
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
      setLoading(false)
      return ''
    },
    [loading, alert]
  )

  const handleButtonCreatePoint = useCallback(async () => {
    setLoading(true)
    formRef.current?.setErrors({})

    if (itemsSelecteds.length === 0) {
      handleAlertError({
        title: 'Nenhum item selecionado',
        description: 'Selecione no mínimo 1 item da lista'
      })
      return ''
    }

    if (dataImageUri === '') {
      handleAlertError({
        title: 'Foto não encontrada',
        description: 'É preciso enviar uma foto do local'
      })
      return ''
    }

    const { accessToken } = getAccount

    const { data, error } = await addPoint({
      file: dataImageUri,
      items: itemsSelecteds,
      token: accessToken,
      locationType: params.locationType,
      placeName: params.placeName,
      referencePoint: params.referencePoint,
      latitude: params.latitude,
      longitude: params.longitude
    })

    if (error) {
      handleAlertError({
        title: 'Erro ao criar novo ponto',
        description: error
      })
    }

    if (data) {
      setIsOpenModal(true)
      setTimeout(() => {
        setIsOpenModal(false)
        navigate('Maps')
      }, 5000)
    }

    setLoading(false)
  }, [itemsSelecteds, dataImageUri])

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
    handleAlertError({
      title: 'Foto deletada',
      description: 'Arquivo de imagem deletada'
    })
    return ''
  }, [])

  const handleCloseButtonModal = useCallback(() => {
    setIsOpenModal(false)
    navigate('Maps')
  }, [isOpenModal])

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
      <FormContent ref={formRef} onSubmit={handleButtonCreatePoint}>
        <Body>
          <ListItems>
            <Filter title="Selecione os items" />
          </ListItems>
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
      </FormContent>
      {alert.active && (
        <AlertAnimated
          title={alert.title}
          description={alert.description}
          backgroundColor={'#f05545'}
          colorActions={'#7f0000'}
          iconName="alert"
        />
      )}
      <Modal
        style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
        isVisible={isOpenModal}
      >
        <ModalContent>
          <ModalContentSVG>
            <ContentCheckLottie
              loop={false}
              source={require('../../../../assets/lottie/check.json')}
            />
          </ModalContentSVG>
          <ModalContentBottom>
            <ModalContentText>
              <ModalSuccessText>Parabéns</ModalSuccessText>
              <ModalSuccessTextDescription numberOfLines={2}>
                ponto de descarte salvo com sucesso
              </ModalSuccessTextDescription>
            </ModalContentText>
            <ModalContentButton>
              <Button
                onPress={handleCloseButtonModal}
                style={{ width: '100%' }}
                text="fechar"
              />
            </ModalContentButton>
          </ModalContentBottom>
        </ModalContent>
      </Modal>
    </Container>
  )
}
