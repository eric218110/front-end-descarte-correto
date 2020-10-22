import styled from 'styled-components/native'
import { Dimensions } from 'react-native'
import { Picker } from '@react-native-community/picker'
import {
  MaterialIcons,
  Fontisto,
  MaterialCommunityIcons
} from '@expo/vector-icons'

import MapView from 'react-native-maps'
import { Input } from '../../../../components/Input'

const { height, width } = Dimensions.get('screen')

export const Container = styled.SafeAreaView`
  height: ${height}px;
  width: ${width}px;
  background: ${({ theme }) => theme.background};
`
export const ContainerMap = styled.View`
  width: 100%;
  height: 30%;
`

export const MapViewStyled = styled(MapView).attrs(({ theme }) => ({
  showsUserLocation: true,
  customMapStyle: theme.mapStyle,
  showsMyLocationButton: false,
  showsTraffic: false,
  showsCompass: false,
  showsBuildings: false,
  showsIndoors: false,
  showsScale: false,
  showsIndoorLevelPicker: false,
  showsPointsOfInterest: false,
  zoomEnabled: false,
  scrollEnabled: false
}))`
  width: 100%;
  height: 100%;
`

export const Content = styled.View`
  width: 100%;
  height: 60%;
  align-items: center;
`

export const Body = styled.ScrollView`
  flex: 1;
  margin-top: 20px;
`

export const InputStyled = styled(Input).attrs(() => ({
  customStyle: {
    marginTop: 21
  }
}))``

export const InputGroup = styled.View`
  justify-content: center;
  align-items: stretch;
  flex: 1;
`

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
  color: ${({ theme }) => theme.text.dark};
`

export const HelpContainer = styled.TouchableOpacity``

export const HelpText = styled.Text`
  font-family: roboto_700;
  font-size: 10px;
  color: ${({ theme }) => theme.primary};
  letter-spacing: 2px;
`

export const PickerText = styled.Text`
  position: absolute;
  top: 3px;
  z-index: 5;
  left: 10px;
  color: ${({ theme }) => theme.actions.disable.dark};
  font-size: 12px;
`

export const PickerStyled = styled(Picker)`
  padding: 0px 0px 0px 10px;
  margin-top: 5px;
  color: ${({ theme }) => theme.actions.disable.dark};
  flex: 1;
  font-size: 18px;
`

export const PickerStyledContainerItems = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.backgroundSecundary};
  height: 80%;
  border-radius: 10px;
`

export const PickerStyledContainer = styled.View`
  margin-top: 21px;
  width: 100%;
  height: 55px;
  background-color: ${({ theme }) => theme.backgroundSecundary};
  border-radius: 10px;
  justify-content: space-around;
`

export const IconLocation = styled(MaterialIcons).attrs(() => ({
  name: 'location-city',
  size: 28
}))``

export const IconPlacePoint = styled(MaterialCommunityIcons).attrs(() => ({
  name: 'home-city',
  size: 28
}))``

export const ReferencePoint = styled(MaterialCommunityIcons).attrs(() => ({
  name: 'routes',
  size: 28
}))``

export const NextIcon = styled(Fontisto).attrs(({ theme }) => ({
  name: 'arrow-right',
  size: 18,
  color: theme.text.light
}))``
