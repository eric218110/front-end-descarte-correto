import React, { useCallback, useEffect, useState } from 'react'
import {
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
} from '../styles'
import { InputGroup, ContainerLogin, Container } from './styles'
import { Button } from '../../../components/Button'
import { Animated, Keyboard } from 'react-native'
import { colors } from '../../../styles/colors'
import { useNavigation } from '@react-navigation/native'

export const SignUpAccount = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false)
  const [offSet] = useState(new Animated.ValueXY({ x: 0, y: 150 }))
  const [opacity] = useState(new Animated.Value(0.5))
  const [opacityText] = useState(new Animated.Value(1))
  const [openKeyboard, setOpenKeyboard] = useState<boolean>()

  const navigator = useNavigation()

  useEffect(() => {
    Animated.parallel([
      Animated.spring(offSet.y, {
        toValue: 0,
        speed: 5,
        useNativeDriver: true,
        bounciness: 15
      }),
      Animated.timing(opacity, {
        useNativeDriver: true,
        toValue: 1,
        duration: 400
      })
    ]).start()
  }, [])

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        Animated.parallel([
          Animated.timing(opacityText, {
            useNativeDriver: true,
            toValue: 0,
            duration: 300
          })
        ]).start()
        setOpenKeyboard(true)
      }
    )
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        Animated.parallel([
          Animated.timing(opacityText, {
            useNativeDriver: true,
            toValue: 1,
            duration: 100
          })
        ]).start()
        setOpenKeyboard(false)
      }
    )

    return () => {
      keyboardDidHideListener.remove()
      keyboardDidShowListener.remove()
    }
  }, [])

  const handleClickButtonLogin = useCallback(() => {
    setLoading(true)
  }, [])

  const handleClickButtonSignUp = useCallback(() => {
    setLoading(true)
    navigator.navigate('Login')
    setLoading(false)
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
        <Animated.View
          style={{
            opacity: opacity,
            transform: [
              {
                translateY: offSet.y
              }
            ]
          }}
        >
          <ContainerLogin>
            <Animated.Text
              style={[
                {
                  fontSize: 36,
                  color: colors.primary,
                  fontFamily: 'roboto_700',
                  marginBottom: openKeyboard ? 0 : 23
                },
                {
                  opacity: opacityText
                }
              ]}
            >
              Criar conta
            </Animated.Text>
            <InputGroup></InputGroup>
          </ContainerLogin>
        </Animated.View>
      </Body>
      <Bottom keyboardOpen={openKeyboard}>
        <Button
          onPress={handleClickButtonLogin}
          loading={loading}
          text="criar conta"
        />
        <CreateAccount keyboardOpen={openKeyboard}>
          <SubtitleBottom>possui conta?</SubtitleBottom>
          <ButtonTouchableOpacity onPress={handleClickButtonSignUp}>
            <TextTouchableOpacity>entrar</TextTouchableOpacity>
          </ButtonTouchableOpacity>
        </CreateAccount>
      </Bottom>
    </Container>
  )
}
