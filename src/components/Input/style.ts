import styled, { css } from 'styled-components/native'
import { colors } from '../../styles/colors'

export const Wrapper = styled.View``

export const Container = styled.View<{ isFocused: boolean; isError: boolean }>`
  width: 320px;
  height: 50px;
  background-color: ${colors.primaryLight};
  border-radius: 10px;
  border: 2px solid transparent;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  margin-top: 30px;
  ${props =>
    props.isFocused &&
    css`
      border-color: ${colors.primary};
    `}
  ${props =>
    props.isError &&
    css`
      border-color: ${colors.actions.error.dark};
    `}
    z-index: 4;
`

export const InputStyled = styled.TextInput`
  height: 100%;
  padding-left: 10px;
  padding-right: 3px;
  font-size: 18px;
  width: 90%;
  flex: 1;
  color: ${colors.primary};
  font-weight: bold;
`
export const TextErrorContainer = styled.View`
  background-color: ${colors.actions.error.dark};
  width: 100%;
  padding-left: 20px;
  padding-top: 15px;
  padding-bottom: 5px;
  z-index: 1;
  position: absolute;
  top: 80%;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
`

export const TextError = styled.Text`
  font-size: 10px;
  color: ${colors.text.light};
  letter-spacing: 2px;
`
