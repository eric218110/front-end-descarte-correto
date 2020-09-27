import styled from 'styled-components/native'
import { colors } from '../../styles/colors'

export const Container = styled.View`
  width: 320px;
  height: 42px;
  background-color: ${colors.primaryLight};
  border-radius: 5px;
  border: 1px solid ${colors.primary};
`

export const TextInput = styled.Text`
  font-size: 10px;
  color: ${colors.primary};
  position: absolute;
  text-transform: uppercase;
  top: 0;
  left: 10px;
  letter-spacing: 1px;
`

export const InputStyled = styled.TextInput`
  height: 90%;
  padding-left: 10px;
  padding-top: 10px;
  padding-right: 3px;
`
