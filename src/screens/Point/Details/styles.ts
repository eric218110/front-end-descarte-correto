import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import MapView from 'react-native-maps'
import { StyleSheet } from 'react-native'
import HeaderImageScrollView from 'react-native-image-header-scroll-view'

const withBorder = StyleSheet.hairlineWidth

export const Container = styled.ScrollView`
  background: ${({ theme }) => theme.background};
`

export const HeaderImageScrollViewStyled = styled(HeaderImageScrollView).attrs(
  ({ theme }) => ({
    showsVerticalScrollIndicator: false,
    minOverlayOpacity: 0,
    maxOverlayOpacity: 1,
    overlayColor: theme.backgroundSecundary,
    scrollViewBackgroundColor: theme.background,
    maxHeight: 400,
    minHeight: 80,
    useNativeDriver: true,
    bounces: true
  })
)``

export const ContainerMap = styled.View`
  height: 250px;
  align-items: flex-end;
  width: 90%;
  margin: auto;
  margin-top: 15px;
`

export const ContainerActionRouteButton = styled(RectButton)`
  position: absolute;
  bottom: 38px;
  right: 21px;
  height: 50px;
  width: 50px;
  border-radius: 25px;
  background: ${({ theme }) => theme.primary};
  align-items: center;
  justify-content: center;
`

export const IconActionRouteButton = styled(MaterialCommunityIcons).attrs(
  ({ theme }) => ({
    name: 'directions',
    size: 32,
    color: theme.text.light
  })
)``
export const MapViewContainer = styled.View`
  height: 75%;
  width: 100%;
  overflow: hidden;
  background: ${({ theme }) => theme.backgroundSecundary};
  border-radius: 15px;
  margin-top: 10px;
`

export const MapViewStyled = styled(MapView).attrs(({ theme }) => ({
  showsMyLocationButton: false,
  showsTraffic: false,
  showsCompass: false,
  showsBuildings: false,
  showsIndoors: false,
  showsScale: false,
  showsIndoorLevelPicker: false,
  showsPointsOfInterest: false,
  zoomEnabled: false,
  scrollEnabled: false,
  customMapStyle: theme.mapStyle
}))`
  flex: 1;
`

export const TextNamePoint = styled.Text`
  font-size: 18px;
  font-family: roboto_700;
  text-align: center;
  color: ${({ theme }) => theme.primary};
`

export const TextDirectionMapContainer = styled.TouchableOpacity``
export const HeaderContainer = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  height: 10%;
  width: 100%;
`

export const TextDirectionMap = styled.Text`
  text-transform: uppercase;
  font-size: 14px;
  font-family: roboto_700;
  color: ${({ theme }) => theme.primary};
`

export const TextDistance = styled.Text`
  text-transform: uppercase;
  font-size: 12px;
  font-family: roboto_500;
  width: 100%;
  height: 15%;
  margin-top: 10px;
  text-align: left;
  color: ${({ theme }) => theme.primary};
`

export const ContainerItems = styled.View`
  width: 100%;
  align-items: center;
`

export const ContainerListItem = styled.View`
  width: 90%;
  margin-top: 20px;
  border: ${withBorder}px solid ${({ theme }) => theme.backgroundSecundary};
  border-radius: 10px;
  padding: 10px;
`

export const ContainerItem = styled.View`
  width: 100%;
  height: 80px;
  align-items: center;
  background: ${({ theme }) => theme.backgroundSecundary};
  margin-top: 5px;
  margin-bottom: 10px;
  border-radius: 10px;
  flex-direction: row;
  padding-right: 10px;
`

export const LeftContainer = styled.View<{ color: string }>`
  background: ${({ color }) => color};
  width: 8px;
  border-radius: 10px;
  height: 80%;
  margin: 0px 20px 0px 10px;
`

export const ContainerText = styled.View`
  justify-content: space-around;
  height: 70%;
`

export const Title = styled.Text.attrs(() => ({
  numberOfLines: 1
}))`
  text-transform: capitalize;
  font-size: 16px;
  font-family: roboto_700;
  color: ${({ theme }) => theme.primary600};
`

export const TitleDescription = styled.Text.attrs(() => ({
  numberOfLines: 2
}))`
  text-transform: capitalize;
  font-size: 14px;
  font-family: roboto_500;
  color: ${({ theme }) => theme.primary600};
`

export const ContainerFooter = styled.View`
  background: red;
`
