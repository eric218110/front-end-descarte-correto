import styled from 'styled-components/native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export const ContainerLogin = styled.View`
  justify-content: center;
  height: 183px;
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
