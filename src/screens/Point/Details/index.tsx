import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import { ResponseListPoints, getOnePointApi } from '../../../service/api/points'
import { Loading } from '../../../components/Loading'
import { AlertAnimated } from '../../../components/Alert'
import { colors } from '../../../styles/colors'
import {
  Container,
  ImageContainer,
  Body,
  ContentBody,
  Header,
  TextCreateBy,
  Stars,
  TextTitle,
  TextDescription,
  Divider,
  ContentBox,
  RowAddressInfo,
  TextStrong,
  ItemContent,
  NameItem,
  ContainerActionRouteButton,
  IconActionRouteButton,
  StarIcon,
  StarIconOutline
} from './styles'
import { StatusBar } from 'react-native'

type PointDataScreenParams = RouteProp<
  Record<'PointDataScreenParams', { id: string }>,
  'PointDataScreenParams'
>

type ErrorAlert = {
  active: boolean
  title: string
  description: string
}

export const DetailsPoint: React.FC = () => {
  const { id } = useRoute<PointDataScreenParams>().params
  const { goBack } = useNavigation()
  const [point, setPoint] = useState<ResponseListPoints | null>(null)
  const [alert, setActiveAlert] = useState<ErrorAlert>({} as ErrorAlert)

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
    <Container>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <>
        {point ? (
          <Container>
            <ImageContainer
              source={{
                uri: point.image
              }}
            />
            <Header>
              <TextCreateBy>
                <TextDescription>ponto de coleta criado por </TextDescription>
                <TextStrong>{point.account.name}</TextStrong>
              </TextCreateBy>
            </Header>
            <Stars>
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIconOutline />
              <StarIconOutline />
            </Stars>
            <ContentBody>
              <Body>
                <ContentBox>
                  <TextTitle>descrição</TextTitle>
                  <TextDescription>{point.name}</TextDescription>
                </ContentBox>
                <Divider />
                <ContentBox>
                  <TextTitle>endereço</TextTitle>
                  <RowAddressInfo>
                    <TextStrong>Rua: </TextStrong>
                    <TextDescription>{point.street}</TextDescription>
                  </RowAddressInfo>
                  <RowAddressInfo>
                    <TextStrong small>Bairro: </TextStrong>
                    <TextDescription small>
                      {point.neighborhood}
                    </TextDescription>
                  </RowAddressInfo>
                  <RowAddressInfo>
                    <TextStrong small>cidade: </TextStrong>
                    <TextDescription small>{point.city}</TextDescription>
                  </RowAddressInfo>
                  <RowAddressInfo>
                    <TextStrong small>cep: </TextStrong>
                    <TextDescription small>{point.zipCode}</TextDescription>
                  </RowAddressInfo>
                </ContentBox>
                <Divider />
                <ContentBox>
                  <TextTitle>ponto de REFERÊNCIA</TextTitle>
                  <TextDescription>{point.reference}</TextDescription>
                </ContentBox>
                <Divider />
                <ContentBox endList>
                  <TextTitle>recebe os items</TextTitle>
                  {point.items.map(item => (
                    <ItemContent background={item.color} key={item.id}>
                      <NameItem color={item.activeColor}>{item.title}</NameItem>
                    </ItemContent>
                  ))}
                </ContentBox>
              </Body>
            </ContentBody>
            <ContainerActionRouteButton>
              <IconActionRouteButton />
            </ContainerActionRouteButton>
          </Container>
        ) : (
          <Loading />
        )}
        {alert.active && (
          <AlertAnimated
            title={alert.title}
            description={alert.description}
            backgroundColor={colors.actions.error.light}
            colorActions={colors.actions.error.dark}
            iconName="alert"
          />
        )}
      </>
    </Container>
  )
}
