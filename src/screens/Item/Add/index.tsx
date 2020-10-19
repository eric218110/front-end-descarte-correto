import React, { useCallback, useRef, useState } from 'react'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'
import { Input } from '../../../components/Input'
import {
  Wrapper,
  Header,
  Body,
  TitleHeader,
  IconText,
  InputsGroup,
  IconTextDetails,
  ColorPickerContainer,
  ColorPickerWrapper,
  TextColorPickerContainer,
  TitleColorName,
  HeaderPalette,
  IconPalette,
  TextPaletteColorSelected,
  CircleColorSelected,
  ColorPickerStyled
} from './styles'
import { Button } from '../../../components/Button'
import getValidationErrorsYup from '../../../utils/getValidationErrorYup'
import * as Yup from 'yup'
import { AlertAnimatedError, ErrorAlert } from '../../../components/Alert'
import { useItemsContext } from '../../../service/context/items-context'
import { useNavigation } from '@react-navigation/native'
import { useAccountContext } from '../../../service/context/account-context'
import { fromHsv } from 'react-native-color-picker'

export const AddItem = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false)
  const [colorPrimary, setColorPrimary] = useState<string>('#ffffff')
  const [colorSecundary, setColorSecundary] = useState<string>('#000000')
  const [alert, setActiveAlert] = useState<ErrorAlert>({
    active: false,
    title: '',
    description: ''
  })

  const { getAccount } = useAccountContext()
  const navigator = useNavigation()
  const { addItem } = useItemsContext()

  const formRef = useRef<FormHandles>(null)

  const handleSubmit = useCallback(
    async (data: { title: string; description: string }) => {
      try {
        setLoading(true)
        formRef.current?.setErrors({})

        const schemasYup = Yup.object().shape({
          title: Yup.string().required('Campo obrigatório'),
          description: Yup.string().required('Campo obrigatório')
        })

        await schemasYup.validate(data, {
          abortEarly: false
        })

        const { accessToken } = getAccount

        const { error } = await addItem({
          title: data.title,
          description: data.description,
          color: colorPrimary.toLowerCase(),
          activeColor: colorSecundary.toLowerCase(),
          accessToken
        })

        if (!error) {
          setLoading(false)
          navigator.goBack()
        } else {
          setLoading(false)
          setActiveAlert({
            active: true,
            title: `error: ${error}`,
            description: error
          })
          setTimeout(() => {
            setActiveAlert({
              active: false,
              title: '',
              description: ''
            })
          }, 5000)
        }
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrorsYup(error)
          formRef.current?.setErrors(errors)
          return ''
        }
        setActiveAlert({
          active: true,
          title: 'Erro ao criar',
          description: 'Tente novamente mais tarde'
        })
        setTimeout(() => {
          setActiveAlert({
            active: false,
            title: '',
            description: ''
          })
        }, 5000)
        setLoading(false)
      }
    },
    [colorPrimary, colorSecundary]
  )

  return (
    <Wrapper>
      <Header>
        <TitleHeader>Adicionar novo item</TitleHeader>
      </Header>
      <Body>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <InputsGroup>
            <Input
              Icon={IconText}
              name="title"
              placeholder="Nome do item"
              keyboardType="default"
              autoCapitalize="none"
              returnKeyType="next"
              autoCorrect={false}
            />
            <Input
              Icon={IconTextDetails}
              name="description"
              placeholder="Detalhes do item"
              keyboardType="default"
              autoCapitalize="none"
              returnKeyType="next"
              autoCorrect={false}
            />
          </InputsGroup>
          <ColorPickerWrapper>
            <ColorPickerContainer>
              <TextColorPickerContainer>
                <TitleColorName>Cor principal do item</TitleColorName>
                <HeaderPalette>
                  <IconPalette backgroundColor={colorPrimary} />
                  <TextPaletteColorSelected backgroundColor={colorPrimary}>
                    {colorPrimary}
                  </TextPaletteColorSelected>
                  <CircleColorSelected backgroundColor={colorPrimary} />
                </HeaderPalette>
              </TextColorPickerContainer>
              <ColorPickerStyled
                onColorChange={selectedColor =>
                  setColorPrimary(fromHsv(selectedColor))
                }
              />
            </ColorPickerContainer>
            <ColorPickerContainer>
              <TextColorPickerContainer>
                <TitleColorName>Cor secundaria do item</TitleColorName>
                <HeaderPalette>
                  <IconPalette backgroundColor={colorSecundary} />
                  <TextPaletteColorSelected backgroundColor={colorSecundary}>
                    {colorSecundary}
                  </TextPaletteColorSelected>
                  <CircleColorSelected backgroundColor={colorSecundary} />
                </HeaderPalette>
              </TextColorPickerContainer>
              <ColorPickerStyled
                onColorChange={selectedColor =>
                  setColorSecundary(fromHsv(selectedColor))
                }
              />
            </ColorPickerContainer>
            <Button
              loading={loading}
              style={{
                width: '100%'
              }}
              text="Cadastrar novo item"
              onPress={() => {
                formRef.current?.submitForm()
              }}
            />
          </ColorPickerWrapper>
        </Form>
      </Body>
      {alert.active && (
        <AlertAnimatedError
          title={alert.title}
          description={alert.description}
        />
      )}
    </Wrapper>
  )
}
