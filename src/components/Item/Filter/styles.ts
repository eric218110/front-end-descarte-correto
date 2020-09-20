import { RectButton } from 'react-native-gesture-handler'
import styled, { css } from 'styled-components/native'
import { colors } from '../../../styles/colors'
import LottieView from 'lottie-react-native'

export const Container = styled.View`
  padding-left: 17px;
  padding-right: 17px;
`

export const Header = styled.TouchableOpacity`
  height: 32px;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const Text = styled.Text`
  color: ${colors.primary};
  text-transform: uppercase;
  font-size: 12px;
  font-family: roboto_700;
`

export const ListItems = styled.ScrollView``

export const ItemContent = styled(RectButton)<{
  active?: boolean
  background: string
}>`
  width: 100%;
  height: 39px;
  border-radius: 5px;
  background: yellow;
  align-items: center;
  flex-direction: row;
  margin-bottom: 10px;
  background: ${props => props.background};
  ${props =>
    !props.active &&
    css`
      background: #d1d1d1;
    `};
`
export const NameItem = styled.Text<{ active?: boolean; color: string }>`
  margin-left: 24px;
  color: ${props => props.color};
  font-size: 17px;
  font-family: roboto_700;
  ${props =>
    !props.active &&
    css`
      color: #828282;
    `};
`

export const Bottom = styled.TouchableOpacity`
  height: 32px;
  width: 100%;
  margin-top: 17px;
`

export const ContainerEmpty = styled.View`
  justify-content: center;
  align-items: center;
`

export const ContentEmptyLottieView = styled(LottieView).attrs({
  autoPlay: true,
  hardwareAccelerationAndroid: true,
  loop: true
})`
  height: 300px;
  width: 300px;
`

export const TextEmpty = styled.Text`
  font-size: 25px;
  color: #c4c4d9;
`
