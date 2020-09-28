import styled from 'styled-components/native'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'

export const ContainerLogin = styled.View`
  justify-content: center;
  flex: 1;
  padding-bottom: 60px;
`

export const InputGroup = styled.View`
  justify-content: center;
`

export const IconEmail = styled(MaterialCommunityIcons).attrs(() => ({
  name: 'email',
  size: 24
}))``

export const IconPassword = styled(MaterialCommunityIcons).attrs(() => ({
  name: 'lock',
  size: 24
}))``
export const IconName = styled(Ionicons).attrs(() => ({
  name: 'md-person',
  size: 24
}))``
