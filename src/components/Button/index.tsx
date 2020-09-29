/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Container, Text, Loading, ContainerCircle } from './styles'
import { RectButtonProperties } from 'react-native-gesture-handler'

interface ButtonProps extends RectButtonProperties {
  loading?: boolean
  text?: string
  disable?: boolean
  Icon?: any
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

export const CircleButton = ({
  Icon,
  disable,
  loading,
  ...props
}: ButtonProps): JSX.Element => (
  <ContainerCircle disable={disable} {...props}>
    {!loading ? <Icon /> : <Loading />}
  </ContainerCircle>
)
