import React, { useCallback, useState } from 'react'
import {
  Container,
  Header,
  ContentTitle,
  Title,
  Subtitle,
  SubtitleBottom,
  Body,
  Bottom,
  CreateAccount,
  ButtonTouchableOpacity,
  TextTouchableOpacity
} from './styles'
import Woman from '../../assets/woman.svg'
import { Button } from '../../components/Button'

export const Account = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false)

  const handleClickButtonLogin = useCallback(() => {
    setLoading(true)
  }, [])

  return (
    <Container>
      <Header>
        <ContentTitle>
          <Title>Descarte </Title>
          <Title grenColor>correto</Title>
        </ContentTitle>
        <Subtitle>Vamos cuidar do nosso planeta</Subtitle>
      </Header>
      <Body>
        <Woman />
      </Body>
      <Bottom>
        <Button
          onPress={handleClickButtonLogin}
          loading={loading}
          text="entrar"
        />
        <CreateAccount>
          <SubtitleBottom>novo por aqui?</SubtitleBottom>
          <ButtonTouchableOpacity>
            <TextTouchableOpacity>criar conta</TextTouchableOpacity>
          </ButtonTouchableOpacity>
        </CreateAccount>
      </Bottom>
    </Container>
  )
}
