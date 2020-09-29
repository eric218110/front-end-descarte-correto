import styled from 'styled-components/native'
import { colors } from '../../../../styles/colors'
import { Dimensions } from 'react-native'
import { MaterialIcons, Entypo, Fontisto } from '@expo/vector-icons'

import MapView from 'react-native-maps'

const { height, width } = Dimensions.get('screen')

export const Container = styled.SafeAreaView`
  height: ${height}px;
  width: ${width}px;
  background: ${colors.background};
`
export const ContainerMap = styled.View`
  width: 100%;
  height: 30%;
`

export const MapViewStyled = styled(MapView)`
  width: 100%;
  height: 100%;
`

export const Content = styled.View`
  width: 100%;
  height: 60%;
  align-items: center;
`

export const Body = styled.ScrollView``

export const InputGroup = styled.View``

export const Bottom = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 15px;
  height: 10%;
`

export const ContentLeft = styled.View``

export const Title = styled.Text`
  font-family: roboto_200;
  font-size: 10px;
  color: ${colors.text.dark};
`

export const HelpContainer = styled.TouchableOpacity``

export const HelpText = styled.Text`
  font-family: roboto_700;
  font-size: 10px;
  color: ${colors.primary};
  letter-spacing: 2px;
`

export const IconLocation = styled(MaterialIcons).attrs(() => ({
  name: 'location-city',
  size: 28
}))``

export const DirectionLocation = styled(Entypo).attrs(() => ({
  name: 'direction',
  size: 28
}))``

export const NextIcon = styled(Fontisto).attrs(() => ({
  name: 'arrow-right',
  size: 18,
  color: colors.text.light
}))``
