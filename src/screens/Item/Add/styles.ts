import styled from 'styled-components/native'
import { Dimensions, Platform, StyleSheet } from 'react-native'
import Constants from 'expo-constants'
import { Entypo, MaterialIcons } from '@expo/vector-icons'
import { ColorPicker } from 'react-native-color-picker'
import { Input } from '../../../components/Input'
const widthBorder = StyleSheet.hairlineWidth
const { height, width } = Dimensions.get('window')
const statusBarHeight =
  Platform.OS === 'android' ? Constants.statusBarHeight : 0

export const Wrapper = styled.View`
  background: ${({ theme }) => theme.background};
  padding-top: ${statusBarHeight}px;
  height: ${height}px;
  width: ${width}px;
  align-items: center;
  justify-content: center;
`

export const Header = styled.View`
  height: 10%;
  width: 100%;
  max-width: 250px;
  align-items: center;
  justify-content: center;
`

export const InputStyled = styled(Input).attrs(() => ({
  customStyle: {
    width: '100%'
  }
}))``

export const TitleHeader = styled.Text`
  font-size: 16px;
  font-family: 'roboto_500';
  color: ${({ theme }) => theme.primary};
  text-transform: uppercase;
`

export const Body = styled.KeyboardAvoidingView.attrs(() => ({
  behavior: Platform.OS === 'ios' ? 'padding' : undefined,
  enabled: true
}))`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  max-width: 80%;
`

export const InputsGroup = styled.View`
  height: 25%;
  margin-top: -40px;
`

export const IconText = styled(MaterialIcons).attrs(() => ({
  name: 'text-fields',
  size: 24
}))``

export const IconTextDetails = styled(Entypo).attrs(() => ({
  name: 'text',
  size: 24
}))``

export const ColorPickerStyled = styled(ColorPicker).attrs(() => ({
  hideSliders: true,
  hideControls: true
}))`
  width: 100%;
  height: 60%;
  margin-top: 15px;
`

export const ColorPickerWrapper = styled.View`
  flex: 1;
  align-items: center;
  margin-bottom: 15px;
`

export const TextColorPickerContainer = styled.View`
  height: 30%;
  padding: 7px 16px 0px 16px;
`

export const ColorPickerContainer = styled.View`
  flex: 1;
  border-radius: 10px;
  margin-bottom: 10px;
  width: 100%;
  border: ${widthBorder}px solid ${({ theme }) => theme.backgroundSecundary};
`

export const TitleColorName = styled.Text`
  font-size: 14px;
  font-family: 'roboto_700';
  color: ${({ theme }) => theme.primary};
  text-transform: uppercase;
  margin-bottom: 5px;
`

export const HeaderPalette = styled.View`
  background-color: ${({ theme }) => theme.backgroundSecundary};
  height: 60%;
  margin-top: 2px;
  border-radius: 7px;
  align-items: center;
  justify-content: space-between;
  padding: 0px 10px;
  flex-direction: row;
`

export const IconPalette = styled(MaterialIcons).attrs(
  ({ backgroundColor }: { backgroundColor: string }) => ({
    name: 'palette',
    size: 24,
    color: backgroundColor
  })
)<{ backgroundColor: string }>``

export const TextPaletteColorSelected = styled.Text<{
  backgroundColor: string
}>`
  font-size: 16px;
  font-family: 'roboto_500';
  color: ${({ theme }) => theme.primary};
  text-transform: uppercase;
  color: ${({ backgroundColor }) => backgroundColor};
`

export const CircleColorSelected = styled.View<{ backgroundColor: string }>`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: ${({ backgroundColor }) => backgroundColor};
`
