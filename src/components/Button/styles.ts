import { RectButton } from 'react-native-gesture-handler'
import styled from 'styled-components/native'
import { colors } from '../../styles/colors'

export const Container = styled(RectButton)<{ disable?: boolean }>`
  display: flex;
  align-items: center;
  width: 50%;
  margin: 3px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  height: 37px;
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
`
