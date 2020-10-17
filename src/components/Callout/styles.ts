import styled from 'styled-components/native'
import { Callout } from 'react-native-maps'
import { Feather } from '@expo/vector-icons'
import { StyleSheet } from 'react-native'

const width = StyleSheet.hairlineWidth

export const CalloutContainerStyled = styled(Callout).attrs(() => ({
  tooltip: true
}))`
  align-items: center;
`

export const ContainerCallout = styled.View`
  width: 210px;
  height: 70px;
  align-items: center;
  flex-direction: row;
  background-color: ${({ theme }) => theme.backgroundSecundary};
  border-radius: 9px;
`

export const LeftContainerCallout = styled.View`
  height: 100%;
  width: 75%;
  padding: 10px;
`

export const ContainerCalloutTop = styled.View`
  width: 100%;
  height: 70%;
  overflow: hidden;
  justify-content: space-around;
`

export const ContainerCalloutBottom = styled.View`
  flex-direction: row;
  width: 100%;
  height: 25%;
  align-items: center;
`

export const CalloutColors = styled.View<{ color: string }>`
  height: 10px;
  width: 10px;
  border-radius: 5px;
  background-color: ${({ color }) => color};
  justify-content: flex-start;
  align-items: center;
  margin-right: 6px;
`

export const RightContainerCallout = styled.View`
  height: 100%;
  width: 30%;
  justify-content: center;
  align-items: center;
`

export const TextCallout = styled.Text.attrs(() => ({
  numberOfLines: 1
}))`
  font-size: 14px;
  font-family: roboto_700;
  text-transform: uppercase;
  color: ${({ theme }) => theme.primary};
`

export const TextCalloutDescription = styled.Text.attrs(() => ({
  numberOfLines: 1
}))`
  font-size: 12px;
  font-family: roboto_500;
  text-transform: lowercase;
  color: ${({ theme }) => theme.primary400};
`

export const DividerCallout = styled.View`
  height: 80%;
  width: ${width}px;
  background-color: ${({ theme }) => theme.actions.disable.dark};
`

export const DividerCalloutHorizontal = styled.View`
  height: ${width}px;
  width: 100%;
  margin-bottom: 4px;
  background-color: ${({ theme }) => theme.actions.disable.dark};
`

export const IconLinkDetailsPoint = styled(Feather).attrs(({ theme }) => ({
  name: 'external-link',
  size: 28,
  color: theme.secundary400
}))`
  margin-right: 7px;
`

export const TriangleCallout = styled.View`
  width: 0px;
  height: 0px;
  background-color: transparent;
  border-style: solid;
  border-left-width: 10px;
  border-right-width: 10px;
  border-bottom-width: 10px;
  border-left-color: transparent;
  border-right-color: transparent;
  border-bottom-color: ${({ theme }) => theme.backgroundSecundary};
  transform: rotate(180deg);
`
