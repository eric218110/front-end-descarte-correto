import styled, { css } from 'styled-components/native'
import Woman from '../../assets/woman.svg'
import { Dimensions, Platform } from 'react-native'
import Constants from 'expo-constants'

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

export const Header = styled.View<{ keyboardOpen?: boolean }>`
  align-items: center;
  justify-content: center;
  height: 20%;
`

export const Bottom = styled.View<{ keyboardOpen?: boolean }>`
  align-items: center;
  margin-bottom: 75px;
  justify-content: center;
  /* ${props =>
    props.keyboardOpen &&
    css`
      flex-direction: row;
      justify-content: space-between;
      width: 320px;
      align-items: center;
      padding-top: 20px;
      height: 40px;
      margin: auto;
      margin-top: 30px;
      margin-bottom: 30px;
    `} */
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

export const WomanIconSVG = styled(Woman)`
  flex: 1;
`
