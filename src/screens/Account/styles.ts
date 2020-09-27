import styled, { css } from 'styled-components/native'
import { colors } from '../../styles/colors'

export const Wrapper = styled.SafeAreaView``

export const Container = styled.ScrollView.attrs(() => ({
  keyboardShouldPersistTaps: 'handled',
  contentContainerStyle: {
    flex: 1
  }
}))`
  background: ${colors.background};
  flex: 1;
  padding-top: 102px;
`

export const ContentTitle = styled.Text`
  justify-content: center;
`

export const Title = styled.Text<{ grenColor?: boolean }>`
  font-family: roboto_700;
  font-size: 26px;
  color: ${props => (props.grenColor ? colors.primary : '#000')};
`

export const Subtitle = styled.Text`
  font-family: roboto_200;
  color: ${colors.actions.success.dark};
  font-size: 18px;
  margin-top: 20px;
  margin-bottom: 20px;
`

export const SubtitleBottom = styled.Text`
  font-family: roboto_200;
  color: ${colors.primary};
  font-size: 13px;
  margin-top: 20px;
  text-transform: uppercase;
`

export const Header = styled.View`
  align-items: center;
`

export const Body = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

export const Bottom = styled.View<{ keyboardOpen?: boolean }>`
  align-items: center;
  margin-bottom: 75px;
  justify-content: center;
  ${props =>
    props.keyboardOpen &&
    css`
      flex-direction: row;
      justify-content: center;
      width: 320px;
      align-items: center;
      margin-top: 20px;
      margin-bottom: 0px;
      height: 40px;
      margin: auto;
    `}
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
  color: ${colors.primaryDark};
  font-size: 15px;
  margin-top: 5px;
  text-transform: uppercase;
`
