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
import { fromHsv } from 'react-native-color-picker'

export const AddItem = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false)
  const [colorPrimary, setColorPrimary] = useState<string>('#FFF')
  const [colorSecundary, setColorSecundary] = useState<string>('#000')
  const handleSubmit = useCallback(() => {
    setLoading(true)
  }, [])
  const formRef = useRef<FormHandles>(null)

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
              name="title"
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
                onColorChange={color => setColorPrimary(fromHsv(color))}
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
                onColorChange={color => setColorSecundary(fromHsv(color))}
              />
            </ColorPickerContainer>
            <Button
              loading={loading}
              style={{
                width: '80%'
              }}
              text="Cadastrar novo item"
              onPress={() => {
                formRef.current?.submitForm()
              }}
            />
          </ColorPickerWrapper>
        </Form>
      </Body>
    </Wrapper>
  )
}
