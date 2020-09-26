import React from 'react'
import { Container, Text, Loading } from './styles'
import { RectButtonProperties } from 'react-native-gesture-handler'

interface ButtonProps extends RectButtonProperties {
  loading?: boolean
  text: string
  disable?: boolean
}

export const Button = ({
  text,
  disable,
  loading,
  ...props
}: ButtonProps): JSX.Element => (
  <Container disable={disable} {...props}>
    {!loading ? <Text>{text}</Text> : <Loading />}
  </Container>
)
