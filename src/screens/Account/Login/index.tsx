import React, { useCallback, useEffect, useState } from 'react'
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
} from '../styles'
import { InputGroup, ContainerLogin } from './styles'
import { Button } from '../../../components/Button'
import { Input } from '../../../components/Input'
import { Animated, Keyboard } from 'react-native'
import { colors } from '../../../styles/colors'
import { useNavigation } from '@react-navigation/native'
import { useAccountContext } from '../../../service/context/account-context'

export const LoginAccount = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false)
  const [offSet] = useState(new Animated.ValueXY({ x: 0, y: 150 }))
  const [opacity] = useState(new Animated.Value(0.5))
  const [opacityText] = useState(new Animated.Value(1))
  const [openKeyboard, setOpenKeyboard] = useState<boolean>()
  const [email, setEmailInput] = useState<string>('')
  const [password, setPasswordInput] = useState<string>('')
  const { signIn } = useAccountContext()
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

  const handleClickButtonLogin = useCallback(async () => {
    setLoading(true)
    const response = await signIn({ email, password })
    console.log(response)

    setLoading(false)
  }, [])

  const handleClickButtonSignUp = useCallback(() => {
    setLoading(true)
    navigator.navigate('SignUp')
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
              Login
            </Animated.Text>
            <InputGroup>
              <Input
                keyboardType="email-address"
                autoCorrect={false}
                text="email"
                returnKeyType="next"
                onChangeText={value => {
                  setEmailInput(value)
                }}
              />
              <Input
                secureTextEntry
                text="password"
                returnKeyType="send"
                onSubmitEditing={handleClickButtonLogin}
                style={{ marginTop: 42 }}
                onChangeText={value => {
                  setPasswordInput(value)
                }}
              />
            </InputGroup>
          </ContainerLogin>
        </Animated.View>
      </Body>
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
    </Container>
  )
}
