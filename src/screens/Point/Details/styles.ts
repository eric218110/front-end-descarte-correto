import styled from 'styled-components/native'
import { colors } from '../../../styles/colors'
import { RectButton } from 'react-native-gesture-handler'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export const Container = styled.SafeAreaView`
  background: ${colors.background};
  justify-content: center;
  align-items: center;
`

export const ImageContainer = styled.Image.attrs(() => ({
  imageStyle: {
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    resizeMode: 'center'
  }
}))``

export const Body = styled.View`
  width: 100%;
  padding-bottom: 20px;
`

export const ContentBody = styled.View`
  flex: 1;
`

export const Header = styled.View``

export const TextCreateBy = styled.TouchableOpacity`
  flex-direction: row;
`

export const Stars = styled.View`
  flex-direction: row;
  margin-top: 10px;
  width: 320px;
  padding-bottom: 20px;
`

export const StarIcon = styled(MaterialCommunityIcons).attrs(() => ({
  name: 'star',
  size: 32,
  color: '#FFC805'
}))``

export const StarIconOutline = styled(MaterialCommunityIcons).attrs(() => ({
  name: 'star-outline',
  size: 32,
  color: '#FFC805'
}))``

export const ContentBox = styled.View<{ endList?: boolean }>`
  width: 320px;
  padding: 10px;
  background: ${colors.secundary};
  justify-content: center;
  border-radius: 5px;
  margin-bottom: ${props => (!props.endList ? '2px' : '60px')};
`

export const TextTitle = styled.Text`
  font-family: roboto_500;
  font-size: 10px;
  color: ${colors.text.light};
  text-transform: uppercase;
  position: absolute;
  left: 10px;
  top: 2px;
`

export const TextDescription = styled.Text<{ small?: boolean }>`
  font-family: roboto_500;
  font-size: 15px;
  color: ${colors.primary};
  margin-top: ${props => (props.small ? 0 : '7px')};
`

export const Divider = styled.View`
  width: 300px;
  background: #d1d1d1;
  height: 1px;
  margin-top: 8px;
  margin-bottom: 8px;
  margin-left: 10px;
`

export const RowAddressInfo = styled.View`
  flex-direction: row;
`

export const TextStrong = styled.Text<{ small?: boolean }>`
  font-family: roboto_700;
  font-size: 15px;
  color: ${colors.primary};
  text-transform: uppercase;
  margin-top: ${props => (props.small ? 0 : '7px')};
`

export const ItemContent = styled(RectButton)<{
  background: string
}>`
  width: 100%;
  height: 39px;
  border-radius: 5px;
  align-items: center;
  flex-direction: row;
  margin-top: 10px;
  background: ${props => props.background};
`

export const NameItem = styled.Text<{ color: string }>`
  margin-left: 24px;
  color: ${props => props.color};
  font-size: 17px;
  font-family: roboto_700;
`

export const ContainerActionRouteButton = styled(RectButton)`
  position: absolute;
  bottom: 38px;
  right: 21px;
  height: 50px;
  width: 50px;
  border-radius: 25px;
  background: ${colors.primary};
  align-items: center;
  justify-content: center;
`

export const IconActionRouteButton = styled(MaterialCommunityIcons).attrs(
  () => ({
    name: 'directions',
    size: 32,
    color: colors.text.light
  })
)``
