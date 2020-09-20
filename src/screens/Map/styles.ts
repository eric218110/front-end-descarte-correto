import styled from 'styled-components/native'
import { colors } from '../../styles/colors'
import { Platform } from 'react-native'
import Constants from 'expo-constants'
import * as Map from 'react-native-maps'
import MapView from 'react-native-maps'

const statusBarHeight =
  Platform.OS === 'android' ? Constants.statusBarHeight : 0

export const Wrapper = styled.SafeAreaView`
  background: ${colors.background};
  flex: 1;
  padding-top: ${statusBarHeight}px;
`

export const Container = styled.View`
  flex: 1;
  justify-content: center;
`

export const MapViewContainer = styled(MapView)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

export const MarkerWrapper = styled(Map.Marker)``

export const IconsListContainer = styled.ScrollView.attrs(() => ({
  horizontal: true,
  showsHorizontalScrollIndicator: false
}))`
  height: 38px;
  width: 100%;
  position: absolute;
  bottom: 36px;
  padding-left: 12px;
`
