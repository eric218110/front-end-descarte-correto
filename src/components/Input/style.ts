import styled, { css } from 'styled-components/native'
import { colors } from '../../styles/colors'

export const Container = styled.View<{ isFocused: boolean; isError: boolean }>`
  width: 320px;
  height: 50px;
  background-color: ${colors.primaryLight};
  border-radius: 5px;
  border: 2px solid transparent;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  margin-bottom: 15px;
  margin-top: 15px;
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
