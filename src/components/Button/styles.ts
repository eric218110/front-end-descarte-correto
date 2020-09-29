import { RectButton } from 'react-native-gesture-handler'
import styled from 'styled-components/native'
import { colors } from '../../styles/colors'

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
  background-color: ${props =>
    props.disable ? colors.actions.disable.dark : colors.primary};
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
  background-color: ${props =>
    props.disable ? colors.actions.disable.dark : colors.primary};
`

export const Loading = styled.ActivityIndicator.attrs({
  color: '#FFF'
})`
  flex: 1;
`

export const Text = styled.Text<{ disable?: boolean }>`
  text-transform: uppercase;
  color: ${props => (props.disable ? '#d6d6d6' : colors.text.light)};
  text-align: center;
  width: 100%;
`
