import styled from 'styled-components/native'
import { MaterialIcons, Feather } from '@expo/vector-icons'

export const Container = styled.View<{ color: string }>`
  background: ${props => props.color};
  border-radius: 45px;
  height: 38px;
  width: 129px;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  margin-right: 7px;
`

export const IconPointLocation = styled(MaterialIcons).attrs({
  name: 'location-on',
  size: 24,
  color: '#FFF'
})``

export const TextNamePoint = styled.Text`
  color: #fff;
  font-family: roboto_700;
  font-size: 14px;
`

export const IconRemoveFilterPoint = styled(Feather).attrs({
  name: 'x',
  size: 24,
  color: '#FFF'
})``
