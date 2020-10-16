import styled, { css } from 'styled-components/native'

export const Wrapper = styled.View``

export const Container = styled.View<{ isFocused: boolean; isError: boolean }>`
  width: 320px;
  height: 50px;
  background-color: ${({ theme }) => theme.backgroundSecundary};
  border-radius: 10px;
  border: 2px solid transparent;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  margin-top: 30px;
  ${props =>
    props.isFocused &&
    css`
      border-color: ${({ theme }) => theme.primary};
    `}
  ${props =>
    props.isError &&
    css`
      border-color: ${({ theme }) => theme.actions.error.light};
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
  color: ${({ theme }) => theme.secundary};
  font-weight: bold;
`
export const TextErrorContainer = styled.View`
  background-color: ${({ theme }) => theme.actions.error.light};
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
  color: ${({ theme }) => theme.text.light};
  letter-spacing: 2px;
`
