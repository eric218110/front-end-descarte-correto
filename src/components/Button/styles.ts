import { RectButton } from 'react-native-gesture-handler'
import styled from 'styled-components/native'

export const Container = styled(RectButton)<{ disable?: boolean }>`
  display: flex;
  align-items: center;
  width: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  height: 37px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme, disable }) =>
    disable ? theme.actions.disable.dark : theme.primary};
`

export const ContainerCircle = styled(RectButton)<{ disable?: boolean }>`
  height: 50px;
  width: 50px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ disable, theme }) =>
    disable ? theme.actions.disable.dark : theme.primary};
`

export const Loading = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.text.light
}))`
  flex: 1;
`

export const Text = styled.Text<{ disable?: boolean }>`
  text-transform: uppercase;
  color: ${({ theme, disable }) =>
    disable ? theme.actions.disable.light : theme.text.light};
  text-align: center;
  width: 100%;
`
