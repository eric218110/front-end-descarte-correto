import styled from 'styled-components/native'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import { RectButton } from 'react-native-gesture-handler'

export const Container = styled.View`
  height: 52px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const Avatar = styled.View`
  flex-direction: row;
  margin-left: 27px;
  align-items: center;
`

export const IconAvatar = styled.View`
  height: 37px;
  width: 37px;
  border-radius: 18px;
  background: ${({ theme }) => theme.backgroundSecundary};
  margin-right: 8px;
  justify-content: center;
  align-items: center;
`

export const ActiveIcon = styled.View`
  height: 6px;
  width: 6px;
  border-radius: 3px;
  background: ${({ theme }) => theme.actions.success.light};
  position: absolute;
  right: 3px;
  bottom: 3px;
`

export const TextAvatar = styled.View`
  flex-direction: column;
  justify-content: center;
`
export const TextName = styled.Text`
  color: ${({ theme }) => theme.secundary};
  font-family: roboto_700;
  text-transform: uppercase;
  font-size: 14px;
`

export const TextEmail = styled.Text`
  color: ${({ theme }) => theme.secundary};
  font-family: roboto_500;
  text-transform: lowercase;
  font-size: 13px;
`

export const ExitAppActionIconContent = styled(RectButton)`
  margin-right: 22px;
  padding: 3px;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
`

export const ExitAppActionIcon = styled(MaterialCommunityIcons).attrs(
  ({ theme }) => ({
    name: 'logout',
    size: 28,
    color: theme.secundary
  })
)``

export const UserCircleIcon = styled(FontAwesome).attrs(({ theme }) => ({
  name: 'user-circle-o',
  size: 28,
  color: theme.secundary
}))``
