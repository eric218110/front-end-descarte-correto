import styled from 'styled-components/native'
import { colors } from '../../../../styles/colors'
import { Dimensions } from 'react-native'

const { height, width } = Dimensions.get('screen')

export const Container = styled.View`
  height: ${height}px;
  width: ${width}px;
  justify-content: center;
  align-items: center;
  background: ${colors.primary};
`
export const Text = styled.Text`
  color: ${colors.text.light};
  font-family: roboto_700;
  font-size: 40px;
`
