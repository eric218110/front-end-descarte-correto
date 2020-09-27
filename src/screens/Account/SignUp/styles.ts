import styled from 'styled-components/native'
import { colors } from '../../../styles/colors'

export const Container = styled.SafeAreaView`
  background: ${colors.background};
  flex: 1;
  padding-top: 102px;
`

export const ContainerLogin = styled.KeyboardAvoidingView`
  justify-content: center;
  flex: 1;
  z-index: 100;
`

export const InputGroup = styled.View`
  justify-content: center;
`
