/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import {
  Wrapper,
  Container,
  InputStyled,
  TextErrorContainer,
  TextError
} from './style'
import { StyleProp, TextInput, TextInputProps, ViewStyle } from 'react-native'
import { useField } from '@unform/core'

interface PropsInputStyled extends TextInputProps {
  name: string
  Icon?: any
  customStyle?: StyleProp<ViewStyle>
}

interface InputValueReference {
  value: string
}

interface RefElementInput {
  focus: () => void
}

export const Input = forwardRef(
  (
    { name, Icon, customStyle, ...rest }: PropsInputStyled,
    ref: React.Ref<RefElementInput>
  ) => {
    const { registerField, defaultValue = '', fieldName, error } = useField(
      name
    )
    const inputValueRef = useRef<InputValueReference>({ value: defaultValue })
    const inputElementRef = useRef<TextInput>(null)

    useImperativeHandle(ref, () => ({
      focus() {
        inputElementRef.current?.focus()
      }
    }))

    useEffect(() => {
      registerField<string>({
        name: fieldName,
        ref: inputValueRef.current,
        path: 'value',
        setValue(ref: any, value) {
          inputValueRef.current.value = value
          inputElementRef.current?.setNativeProps({ text: value })
        },
        clearValue() {
          inputValueRef.current.value = ''
          inputElementRef.current?.clear()
        }
      })
    }, [fieldName, registerField])

    const [isFocused, setIsFocused] = useState<boolean>(false)
    const [isFilled, setIsFilled] = useState<boolean>(false)

    const handleIsFocused = useCallback(() => {
      setIsFocused(true)
    }, [])

    const handleIsBlur = useCallback(() => {
      setIsFocused(false)
      setIsFilled(!!inputValueRef.current.value)
    }, [])

    const getColorField = useCallback((): string => {
      if (isFocused) return '#005005'
      if (isFilled) return '#005005'
      if (error) return '#7f0000'
      return '#a1a1a1'
    }, [error, isFocused, isFilled])

    return (
      <Wrapper>
        <Container
          style={[customStyle]}
          isFocused={isFocused}
          isError={!!error}
        >
          {Icon && <Icon color={getColorField()} />}
          <InputStyled
            ref={inputElementRef}
            placeholderTextColor={getColorField()}
            defaultValue={defaultValue}
            onChangeText={value => (inputValueRef.current.value = value)}
            onFocus={handleIsFocused}
            onBlur={handleIsBlur}
            {...rest}
          />
        </Container>
        {error && (
          <TextErrorContainer>
            <TextError>{error}</TextError>
          </TextErrorContainer>
        )}
      </Wrapper>
    )
  }
)
