import styled, { css } from 'styled-components/native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Animated, Dimensions, Platform } from 'react-native'
import Constants from 'expo-constants'
import { Form } from '@unform/mobile'

const { height, width } = Dimensions.get('window')
const statusBarHeight =
  Platform.OS === 'android' ? Constants.statusBarHeight : 0

export const Wrapper = styled.SafeAreaView`
  height: ${height}px;
  width: ${width}px;
  background: ${({ theme }) => theme.background};
  padding-top: ${statusBarHeight}px;
  justify-content: space-around;
  align-items: center;
  flex: 1;
`

export const ContentTitle = styled.Text`
  justify-content: center;
  width: 100%;
`

export const Title = styled.Text<{ grenColor?: boolean }>`
  font-family: roboto_700;
  font-size: 26px;
  color: ${({ grenColor, theme }) =>
    grenColor ? theme.primary : theme.text.dark};
`

export const Subtitle = styled.Text`
  font-family: roboto_200;
  color: ${({ theme }) => theme.primary};
  font-size: 18px;
  margin-top: 20px;
  margin-bottom: 20px;
`

export const SubtitleBottom = styled.Text`
  font-family: roboto_200;
  color: ${({ theme }) => theme.primary};
  font-size: 13px;
  margin-top: 20px;
  text-transform: uppercase;
`

export const Header = styled.View`
  align-items: center;
  justify-content: center;
  height: 30%;
`

export const Bottom = styled.View<{ keyboardOpen?: boolean }>`
  align-items: center;
  margin-bottom: 75px;
  justify-content: center;
  width: 100%;
`

export const CreateAccount = styled.View<{ keyboardOpen?: boolean }>`
  ${props =>
    props.keyboardOpen &&
    css`
      margin-left: 60px;
      align-items: center;
      justify-content: space-between;
    `}
`

export const ButtonTouchableOpacity = styled.TouchableOpacity`
  margin-bottom: 20px;
  align-items: center;
`

export const TextTouchableOpacity = styled.Text`
  font-family: roboto_700;
  color: ${({ theme }) => theme.primary400};
  font-size: 15px;
  margin-top: 5px;
  text-transform: uppercase;
`

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

export const FormStyled = styled(Form)<{ openKeyboard: boolean }>`
  ${({ openKeyboard }) =>
    openKeyboard &&
    css`
      flex: 1;
    `}
  justify-content: space-around;
  align-items: center;
`

export const TextAnimated = styled(Animated.Text)<{ openKeyboard: boolean }>`
  color: ${({ theme }) => theme.primary};
  ${({ openKeyboard }) =>
    openKeyboard &&
    css`
      position: absolute;
      top: 0;
    `}
  font-size: 36px;
  font-family: roboto_700;
`
