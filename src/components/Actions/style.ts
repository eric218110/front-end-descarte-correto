import { RectButton } from 'react-native-gesture-handler'
import styled from 'styled-components/native'
import { colors } from '../../styles/colors'

export const Container = styled.View`
  position: absolute;
  right: 13px;
  bottom: 91px;
`

export const Content = styled(RectButton)`
  border-radius: 25px;
  height: 45px;
  width: 45px;
  margin-top: 22px;
  background: ${colors.actions.success.dark};
  justify-content: center;
  align-items: center;
`
