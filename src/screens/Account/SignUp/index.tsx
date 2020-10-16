import React, { useCallback, useEffect, useRef, useState } from 'react'
import getValidationErrorsYup from '../../../utils/getValidationErrorYup'
import * as Yup from 'yup'
import { Input } from '../../../components/Input'
import { FormHandles } from '@unform/core'
import { useAccountContext } from '../../../service/context/account-context'
import { useNavigation } from '@react-navigation/native'
import { AlertAnimated } from '../../../components/Alert'
import {
  Header,
  ContentTitle,
  Bottom,
  Title,
  Subtitle,
  SubtitleBottom,
  CreateAccount,
  ButtonTouchableOpacity,
  TextTouchableOpacity,
  InputGroup,
  ContainerLogin,
  IconEmail,
  IconPassword,
  IconName,
  TextAnimated,
  FormStyled,
  Wrapper
} from './styles'
import { Button } from '../../../components/Button'
import {
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput
} from 'react-native'

type ErrorAlert = {
  active: boolean
  title: string
  description: string
}

export const SignUpAccount = (): JSX.Element => {
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
  const { signUp } = useAccountContext()
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
    name: string
    email: string
    password: string
    passwordConfirmation: string
  }

  const handleSubmitLogin = useCallback(async (data: SignInFormDataType) => {
    try {
      setLoading(true)
      formRef.current?.setErrors({})
      const schemasYup = Yup.object().shape({
        name: Yup.string().required('Campo nome é obrigatório'),
        email: Yup.string()
          .required('Campo email é obrigatório')
          .email('Digite um email valido'),
        password: Yup.string()
          .required('Senha é um campo obrigatório')
          .min(8, 'mínimo 8 caracteres')
          .max(16, 'máximo 16 caracteres'),
        passwordConfirmation: Yup.string()
          .required('Campo Confirme a senha, é obrigatório')
          .oneOf([Yup.ref('password'), ''], 'Senhas não são iguais')
      })

      await schemasYup.validate(data, {
        abortEarly: false
      })

      const { success, error } = await signUp({
        name: data.name,
        email: data.email,
        password: data.password,
        passwordConfirmation: data.passwordConfirmation
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
        title: 'Erro ao criar conta',
        description: 'tente novamente mais tarde'
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
      <Wrapper>
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
          <Header openKeyboard={!!openKeyboard}>
            <ContentTitle>
              <Title>Descarte </Title>
              <Title grenColor>correto</Title>
            </ContentTitle>
            <Subtitle>Vamos cuidar do nosso planeta</Subtitle>
          </Header>
          <FormStyled
            openKeyboard={!!openKeyboard}
            ref={formRef}
            onSubmit={handleSubmitLogin}
          >
            <ContainerLogin>
              <TextAnimated
                style={[
                  {
                    opacity: opacityText
                  }
                ]}
                openKeyboard={!!openKeyboard}
              >
                Criar conta
              </TextAnimated>
              <InputGroup>
                <Input
                  Icon={IconName}
                  name="name"
                  placeholder="nome completo"
                  keyboardType="default"
                  autoCapitalize="words"
                  autoCorrect={false}
                />
                <Input
                  Icon={IconEmail}
                  name="email"
                  placeholder="email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  returnKeyType="next"
                />
                <Input
                  Icon={IconPassword}
                  ref={inputPasswordRef}
                  secureTextEntry
                  name="password"
                  placeholder="senha"
                />
                <Input
                  Icon={IconPassword}
                  ref={inputPasswordRef}
                  secureTextEntry
                  name="passwordConfirmation"
                  placeholder="confirme a senha"
                />
              </InputGroup>
            </ContainerLogin>
            <Bottom keyboardOpen={openKeyboard}>
              <Button
                loading={loading}
                text="criar conta"
                onPress={() => {
                  formRef.current?.submitForm()
                }}
              />
              <CreateAccount keyboardOpen={openKeyboard}>
                <SubtitleBottom>já possui conta?</SubtitleBottom>
                <ButtonTouchableOpacity
                  onPress={() => navigator.navigate('Login')}
                >
                  <TextTouchableOpacity>Entrar</TextTouchableOpacity>
                </ButtonTouchableOpacity>
              </CreateAccount>
            </Bottom>
          </FormStyled>
        </Animated.View>
      </Wrapper>
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
