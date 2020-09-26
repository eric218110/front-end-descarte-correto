import styled from 'styled-components/native'
import Logo from '../../assets/logo-white.svg'
import { Fontisto } from '@expo/vector-icons'

export const Wrapper = styled.View`
  height: 35px;
  padding: 3px;
`

export const Container = styled.View`
  flex: 1;
`

export const PointContainer = styled(Fontisto).attrs(
  (props: { backgroundColor: string }) => ({
    name: 'map-marker',
    size: 32,
    color: props.backgroundColor
  })
)`
  position: relative;
  z-index: 2;
`

export const ImageContainer = styled(Logo)`
  height: 20px;
  width: 20px;
  position: absolute;
  z-index: 3;
  left: 4px;
  top: 5px;
`
