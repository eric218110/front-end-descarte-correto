import React, { useCallback, useState } from 'react'
import {
  Wrapper,
  Header,
  ContentTitle,
  Title,
  Subtitle,
  SubtitleBottom,
  Bottom,
  CreateAccount,
  ButtonTouchableOpacity,
  TextTouchableOpacity,
  WomanIconSVG
} from './styles'
import { Button } from '../../components/Button'
import { useNavigation } from '@react-navigation/native'

export const Account = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false)

  const navigator = useNavigation()

  const handleClickButtonLogin = useCallback(() => {
    setLoading(true)
    navigator.navigate('Login')
    setLoading(false)
  }, [])

  const handleClickButtonSignUp = useCallback(() => {
    setLoading(true)
    navigator.navigate('SignUp')
    setLoading(false)
  }, [])

  return (
    <Wrapper>
      <Header>
        <ContentTitle>
          <Title>Descarte </Title>
          <Title grenColor>correto</Title>
        </ContentTitle>
        <Subtitle>Vamos cuidar do nosso planeta</Subtitle>
      </Header>
      <WomanIconSVG />
      <Bottom>
        <Button
          onPress={handleClickButtonLogin}
          loading={loading}
          text="entrar"
        />
        <CreateAccount>
          <SubtitleBottom>novo por aqui?</SubtitleBottom>
          <ButtonTouchableOpacity onPress={handleClickButtonSignUp}>
            <TextTouchableOpacity>criar conta</TextTouchableOpacity>
          </ButtonTouchableOpacity>
        </CreateAccount>
      </Bottom>
    </Wrapper>
  )
}
