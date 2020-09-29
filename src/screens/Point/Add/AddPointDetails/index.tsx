import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Form } from '@unform/mobile'
import { Button } from '../../../../components/Button'
import { Input } from '../../../../components/Input'
import * as Yup from 'yup'
import {
  Container,
  ImageContainer,
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
  ContentRight
} from './styles'
import { Filter } from '../../../../components/Item/Filter'
import { FormHandles } from '@unform/core'
import {
  ItemsProps,
  useItemsContext
} from '../../../../service/context/items-context'
import getValidationErrorsYup from '../../../../utils/getValidationErrorYup'
import { AlertAnimated } from '../../../../components/Alert'
import { colors } from '../../../../styles/colors'

type DetailsPointFormData = {
  titlePoint: string
  imagePoint: string
  itemsSelected: ItemsProps[]
}

type ErrorAlert = {
  active: boolean
  title: string
  description: string
}

export const AddPointDetails: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const { items } = useItemsContext()
  const [loading, setLoading] = useState<boolean>(false)
  const [detailsPoints, setDetailsPoints] = useState<DetailsPointFormData>(
    {} as DetailsPointFormData
  )
  const [alert, setActiveAlert] = useState<ErrorAlert>({} as ErrorAlert)
  const handleButtonCreatePoint = useCallback(
    async (data: DetailsPointFormData) => {
      try {
        setLoading(true)
        formRef.current?.setErrors({})
        const schemasYup = Yup.object().shape({
          title: Yup.string().required('Campo titulo é obrigatório')
        })

        await schemasYup.validate(data, {
          abortEarly: false
        })

        if (detailsPoints.itemsSelected.length === 0) {
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
        }

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
    [detailsPoints]
  )

  useEffect(() => {
    setActiveAlert({
      active: false,
      description: '',
      title: ''
    })
  }, [])

  useEffect(() => {
    const itemsSelected = items.filter((items: ItemsProps) => items.active)
    setDetailsPoints({ ...detailsPoints, itemsSelected })
  }, [items])

  return (
    <Container>
      <ImageContainer>
        <ContentIconCamera>
          <IconCamera />
        </ContentIconCamera>
      </ImageContainer>
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
