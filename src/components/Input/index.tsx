import React from 'react'
import { Container, InputStyled, TextInput } from './style'
import { TextInputProps } from 'react-native'

interface InputProps extends TextInputProps {
  text: string
}

export const Input = ({ text, style, ...props }: InputProps): JSX.Element => {
  return (
    <Container style={style}>
      <TextInput>{text}</TextInput>
      <InputStyled {...props} />
    </Container>
  )
}
