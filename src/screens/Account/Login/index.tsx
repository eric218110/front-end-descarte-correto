/* eslint-disable @typescript-eslint/ban-types */
import React, { useCallback, useEffect, useRef, useState } from 'react'
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
import { InputGroup, ContainerLogin, IconEmail, IconPassword } from './styles'
import { Button } from '../../../components/Button'
import {
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput
} from 'react-native'
import { colors } from '../../../styles/colors'
import { Input } from '../../../components/Input'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import getValidationErrorsYup from '../../../utils/getValidationErrorYup'
import { useAccountContext } from '../../../service/context/account-context'
import { useNavigation } from '@react-navigation/native'
import { AlertAnimated } from '../../../components/Alert'
type ErrorAlert = {
  active: boolean
  title: string
  description: string
}
export const LoginAccount = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false)
  const [offSet] = useState(new Animated.ValueXY({ x: 0, y: 150 }))
  const [opacity] = useState(new Animated.Value(0.5))
  const [opacityText] = useState(new Animated.Value(1))
  const [alert, setActiveAlert] = useState<ErrorAlert>({
    active: false,
    title: '',
    description: ''
  })
  const [openKeyboard, setOpenKeyboard] = useState<boolean>()
  const inputPasswordRef = useRef<TextInput>(null)
  const formRef = useRef<FormHandles>(null)
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

  type SignInFormDataType = {
    email: string
    password: string
  }

  const handleSubmitLogin = useCallback(async (data: SignInFormDataType) => {
    try {
      setLoading(true)
      formRef.current?.setErrors({})
      const schemasYup = Yup.object().shape({
        email: Yup.string()
          .required('Campo email é obrigatório')
          .email('Digite um email valido'),
        password: Yup.string().required('Senha é um campo obrigatório')
      })

      await schemasYup.validate(data, {
        abortEarly: false
      })

      const { success, error } = await signIn({
        email: data.email,
        password: data.password
      })

      if (success) {
        setLoading(false)
        navigator.navigate('AddPoint')
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
        setLoading(false)
        return ''
      }
      setLoading(false)
      setActiveAlert({
        active: true,
        title: 'Erro no login',
        description: 'email ou senha incorretos'
      })
      setTimeout(() => {
        setActiveAlert({
          active: false,
          title: '',
          description: ''
        })
      }, 5000)
    }
  }, [])

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <Container>
        <Animated.View
          style={{
            flex: 1,
            alignItems: 'center',
            opacity: opacity,
            transform: [
              {
                translateY: offSet.y
              }
            ]
          }}
        >
          <Header>
            <ContentTitle>
              <Title>Descarte </Title>
              <Title grenColor>correto</Title>
            </ContentTitle>
            <Subtitle>Vamos cuidar do nosso planeta</Subtitle>
          </Header>

          <Body>
            <Form ref={formRef} onSubmit={handleSubmitLogin}>
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
                    Icon={IconEmail}
                    name="email"
                    placeholder="email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    returnKeyType="next"
                    autoCorrect={false}
                    onSubmitEditing={() => inputPasswordRef.current?.focus()}
                  />
                  <Input
                    Icon={IconPassword}
                    ref={inputPasswordRef}
                    secureTextEntry
                    name="password"
                    placeholder="senha"
                    returnKeyType="send"
                    onSubmitEditing={() => handleSubmitLogin}
                  />
                </InputGroup>
              </ContainerLogin>

              <Bottom>
                <Button
                  loading={loading}
                  text="entrar"
                  onPress={() => {
                    formRef.current?.submitForm()
                  }}
                />
                <CreateAccount>
                  <SubtitleBottom>novo por aqui?</SubtitleBottom>
                  <ButtonTouchableOpacity>
                    <TextTouchableOpacity>criar conta</TextTouchableOpacity>
                  </ButtonTouchableOpacity>
                </CreateAccount>
              </Bottom>
            </Form>
          </Body>
        </Animated.View>
      </Container>
      {alert.active && (
        <AlertAnimated
          title={alert.title}
          description={alert.description}
          backgroundColor="#f2cccc"
          colorActions="#FF0000"
          iconName="alert"
        />
      )}
    </KeyboardAvoidingView>
  )
}
