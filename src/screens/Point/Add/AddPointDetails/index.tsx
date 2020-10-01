import React, { useCallback, useEffect, useRef, useState } from 'react'
import getValidationErrorsYup from '../../../../utils/getValidationErrorYup'
import Modal from 'react-native-modal'
import * as Yup from 'yup'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import { Form } from '@unform/mobile'
import { Button } from '../../../../components/Button'
import { useItemsContext } from '../../../../service/context/items-context'
import { Input } from '../../../../components/Input'
import { AlertAnimated } from '../../../../components/Alert'
import { colors } from '../../../../styles/colors'
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
  IconDeletePhoto,
  ModalContent,
  ModalSuccessText,
  ModalContentSVG,
  ContentCheckLottie,
  ModalContentBottom,
  ModalContentText,
  ModalSuccessTextDescription,
  ModalContentButton
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

  const handleButtonCreatePoint = useCallback(
    async (data: { name: string }) => {
      setLoading(true)
      try {
        formRef.current?.setErrors({})
        const schemasYup = Yup.object().shape({
          name: Yup.string().required('Campo titulo é obrigatório')
        })

        await schemasYup.validate(data, {
          abortEarly: false
        })

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
        const { error } = await addPoint({
          token: getAccount.accessToken,
          city: params.city,
          state: params.state,
          latitude: params.latitude,
          longitude: params.longitude,
          neighborhood: params.neighborhood,
          reference: params.reference,
          street: params.street,
          zipCode: params.zipCode,
          file: dataImageUri,
          name: data.name,
          items: itemsSelecteds
        })

        if (error) {
          handleAlertError({
            title: 'Erro ao criar novo ponto',
            description: error
          })
          return ''
        }

        setIsOpenModal(true)
        setTimeout(() => {
          setIsOpenModal(false)
          navigate('Maps')
        }, 5000)

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
      <Form
        ref={formRef}
        style={{ height: '70%' }}
        onSubmit={handleButtonCreatePoint}
      >
        <ContentMain>
          <Body>
            <DescriptionText>detalhes do ponto de descarte</DescriptionText>
            <ContentItems>
              <Input placeholder="Titulo" name="name" Icon={IconTextInput} />
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
