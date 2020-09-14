import styled from 'styled-components/native'
import { Animated } from 'react-native'

export const Wrapper = styled(Animated.View)`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 9;
  padding: 7px;
  height: 50px;
  max-height: 50px;
  width: 100%;
`

export const Container = styled.View<{ backgroundColor: string }>`
  border-radius: 7px;
  width: 100%;
  background: ${props => props.backgroundColor};
  flex-direction: row;
  padding: 5px;
  align-items: center;
`

export const ContentIcon = styled.View<{ color: string }>`
  background: ${props => props.color};
  height: 30px;
  width: 30px;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
`

export const Divider = styled.View<{ color: string }>`
  width: 4px;
  border-radius: 4px;
  height: 100%;
  background: ${props => props.color};
  margin-right: 32px;
`

export const ContentText = styled.View``

export const Title = styled.Text`
  font-family: roboto_700;
`

export const Description = styled.Text`
  font-weight: 200;
`
