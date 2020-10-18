import styled, { DefaultTheme } from 'styled-components/native'
import { FontAwesome5 } from '@expo/vector-icons'
import Logo from '../../assets/logo.svg'

export const Container = styled.View`
  align-items: center;
  justify-content: center;
`

export const Icon = styled(FontAwesome5).attrs(
  ({
    theme,
    backgroundColor
  }: {
    theme: DefaultTheme
    backgroundColor: string
  }) => ({
    name: 'map-marker',
    size: 30,
    color: backgroundColor || theme.primary
  })
)<{ backgroundColor: string }>``

export const LogoStyled = styled(Logo)`
  position: absolute;
  top: 3px;
  left: 1px;
  z-index: 1;
  width: 150px;
  height: 150px;
`
