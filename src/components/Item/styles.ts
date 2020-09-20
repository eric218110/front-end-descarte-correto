import styled from 'styled-components/native'
import { MaterialIcons, Feather } from '@expo/vector-icons'

export const Container = styled.View<{ color: string }>`
  background: ${props => props.color};
  border-radius: 45px;
  height: 38px;
  width: 129px;
  flex-direction: row;
  margin-right: 7px;
  align-items: center;
`

export const IconPointLocation = styled(MaterialIcons).attrs({
  name: 'location-on',
  size: 24,
  color: '#FFF'
})`
  position: absolute;
  left: 3px;
`

export const TextNamePoint = styled.Text`
  color: #fff;
  font-family: roboto_700;
  font-size: 14px;
  width: 60%;
  position: absolute;
  left: 25%;
`

export const IconRemoveFilterPoint = styled(Feather).attrs({
  name: 'x',
  size: 24,
  color: '#FFF'
})`
  position: absolute;
  right: 3px;
`
