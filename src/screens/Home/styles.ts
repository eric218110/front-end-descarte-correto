/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from 'styled-components/native'
import { Dimensions, Platform } from 'react-native'
import Constants from 'expo-constants'
import { colors } from '../../styles/colors'
import { RectButton } from 'react-native-gesture-handler'
import { MaterialCommunityIcons } from '@expo/vector-icons'

interface IProps {
  color: 'green' | 'grey'
}

const { height, width } = Dimensions.get('screen')
const statusBarHeight =
  Platform.OS === 'android' ? Constants.statusBarHeight : 0

export const Wrapper = styled.SafeAreaView`
  background: ${colors.background};
  padding-top: ${statusBarHeight}px;
  height: ${height}px;
  width: ${width}px;
  align-items: center;
  justify-content: center;
`

export const Container = styled.ScrollView`
  flex: 1;
`
export const Logo = styled.View`
  width: ${width}px;
  height: 134px;
  margin-top: 23px;
  align-items: center;
`

export const TextLogo = styled.Text`
  color: ${colors.text.dark};
  font-family: 'roboto_500';
  font-size: 25.89px;
  font-weight: bold;
`

export const Main = styled.View`
  margin-top: 20px;
  align-items: center;
  margin-bottom: 43px;
`

export const ImageMain = styled.Image`
  height: 200px;
  width: 50px;
`

export const TitleContent = styled.View`
  margin-top: 21.81px;
  width: 205px;
  height: 57px;
  align-items: center;
`

export const TextMain = styled.Text<IProps>`
  color: ${props =>
    props.color === 'green' ? colors.primary : colors.text.dark};
  font-size: 21.89px;
  font-family: 'roboto_500';
  font-weight: bold;
`

export const Bottom = styled.View`
  align-items: center;
  padding-bottom: 20px;
`

export const ButtonBottom = styled(RectButton)<{ disable: boolean }>`
  width: 300px;
  height: 52px;
  border-radius: 10px;
  background: ${props => (props.disable ? colors.primary : '#8B958A')};
  justify-content: center;
  align-items: center;
  flex-direction: row;
`

export const TextButtonBottom = styled.Text`
  font-size: 16px;
  font-family: 'roboto_500';
  color: ${colors.text.light};
  text-transform: uppercase;
  padding-right: 10px;
`
export const ContentRight = styled.View<{ disable: boolean }>`
  height: 52px;
  width: 52px;
  background: ${props =>
    props.disable ? colors.actions.success.dark : '#8B958A'};
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  position: absolute;
  right: 0;
  justify-content: center;
  align-items: center;
`

export const IconLeftButtom = styled(MaterialCommunityIcons).attrs(() => ({
  name: 'arrow-right',
  size: 28,
  color: colors.text.light
}))``
