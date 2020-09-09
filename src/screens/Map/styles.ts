import styled, { css } from 'styled-components/native'
import { colors } from '../../styles/colors'
import { Platform } from 'react-native'
import Constants from 'expo-constants'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { RawButton } from 'react-native-gesture-handler'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type IPropsItem = {
  first?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type IPropsColorItem = {
  color: string
}

const statusBarHeight =
  Platform.OS === 'android' ? Constants.statusBarHeight : 0

export const Wrapper = styled.SafeAreaView`
  background: ${colors.background};
  flex: 1;
  padding-top: ${statusBarHeight}px;
`

export const Container = styled.View`
  flex: 1;
`

export const Header = styled.View`
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
  background: ${colors.primaryLight};
  margin-right: 8px;
  justify-content: center;
  align-items: center;
`

export const ImageUser = styled.Image`
  width: 30px;
  height: 30px;
  border-radius: 16px;
`

export const ActiveIcon = styled.View`
  height: 6px;
  width: 6px;
  border-radius: 3px;
  background: #64ff05;
  position: absolute;
  right: 3px;
  bottom: 3px;
`

export const TextAvatar = styled.Text`
  font-family: 'roboto_500';
  font-size: 14px;
  color: ${colors.primary};
  font-weight: bold;
  text-transform: uppercase;
`
export const ExitAppActionIconContent = styled(RawButton)`
  margin-right: 22px;
  padding: 3px;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
`

export const ExitAppActionIcon = styled(MaterialCommunityIcons).attrs(() => ({
  name: 'logout',
  size: 28,
  color: colors.primary
}))``

export const MapContent = styled.View`
  flex: 1;
`

export const Bottom = styled.View`
  height: 168px;
  width: 100%;
  padding: 17px;
  position: absolute;
  bottom: 15px;
`

export const ContentBottom = styled.View`
  height: 100%;
  border-radius: 20px;
  background: ${colors.background};
  padding: 15px;
`

export const Items = styled.ScrollView.attrs(() => ({
  horizontal: true,
  showsHorizontalScrollIndicator: false
}))``

export const Item = styled.View<IPropsItem & IPropsColorItem>`
  background: green;
  border-radius: 17px;
  width: 70px;
  margin-left: ${props => (props.first ? 0 : css`14px`)};
`

export const IconItem = styled.View``

export const TextItem = styled.Text<IPropsColorItem>`
  color: ${props => props.color};
  font-weight: bold;
  font-family: roboto_500;
  font-size: 14px;
`
