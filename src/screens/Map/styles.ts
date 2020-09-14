/* eslint-disable @typescript-eslint/no-unused-vars */
import styled, { css } from 'styled-components/native'
import { colors } from '../../styles/colors'
import { Platform } from 'react-native'
import Constants from 'expo-constants'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { RawButton } from 'react-native-gesture-handler'
import * as Map from 'react-native-maps'

type IPropsItem = {
  first?: boolean
  active?: boolean
}

type IPropsColorItem = {
  color: string
}

type IPropsColorActive = {
  activeColor: string
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

export const Item = styled.View<
  IPropsItem & IPropsColorItem & IPropsColorActive
>`
  background: ${props => props.color};
  border-radius: 17px;
  width: 70px;
  margin-left: 10px;
  justify-content: center;
  align-items: center;
  border: solid 3px ${props => props.color};
  ${props =>
    props.active &&
    css`
      border-color: ${props.activeColor};
    `}
`

export const IconItem = styled.Image`
  height: 65%;
  width: 90%;
  align-self: center;
`

export const TextItem = styled.Text<IPropsColorItem>`
  color: ${props => props.color};
  font-weight: bold;
  font-family: roboto_500;
  font-size: 14px;
  height: 25%;
`

export const MarkerWrapper = styled(Map.Marker)``

export const Marker = styled.View`
  height: 45px;
  width: 45px;
  background: rgba(0, 188, 212, 0.08);
`

export const MarkerLocation = styled.View`
  border-radius: 25px;
  height: 45px;
  width: 45px;
  background: rgba(0, 188, 212, 0.2);
  align-items: center;
  justify-content: center;
`
