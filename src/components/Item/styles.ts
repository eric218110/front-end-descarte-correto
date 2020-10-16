import styled from 'styled-components/native'
import { MaterialIcons } from '@expo/vector-icons'

export const Container = styled.View<{ color: string }>`
  background: ${props => props.color};
  border-radius: 45px;
  height: 38px;
  width: 129px;
  flex-direction: row;
  margin-right: 7px;
  align-items: center;
`

export const IconPointLocation = styled(MaterialIcons).attrs(({ color }) => ({
  name: 'location-on',
  size: 24,
  color: color
}))<{ color: string }>`
  position: absolute;
  left: 3px;
  width: 25%;
`

export const TextNamePoint = styled.Text<{ color: string }>`
  color: ${({ color }) => color};
  font-family: roboto_700;
  font-size: 14px;
  width: 70%;
  position: absolute;
  left: 25%;
`
