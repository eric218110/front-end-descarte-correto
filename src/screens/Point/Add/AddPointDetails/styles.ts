import styled from 'styled-components/native'
import LottieView from 'lottie-react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { colors } from '../../../../styles/colors'
import { Dimensions } from 'react-native'

const { height, width } = Dimensions.get('window')

export const Container = styled.SafeAreaView`
  height: ${height}px;
  width: ${width}px;
  background: ${colors.background};
  justify-content: center;
  align-items: center;
`

export const ImageContainer = styled.View`
  width: 100%;
  height: 30%;
  align-items: center;
  justify-content: center;
  background: ${colors.secundary};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`

export const ContentPhotoPreview = styled.ImageBackground.attrs(() => ({
  imageStyle: { borderBottomRightRadius: 15, borderBottomLeftRadius: 15 }
}))`
  width: 100%;
  height: 30%;
  align-items: center;
  justify-content: center;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`

export const IconDeletePhotoContainer = styled.TouchableOpacity`
  height: 30px;
  width: 30px;
  border-radius: 15px;
  align-items: center;
  background: ${colors.primary};
  justify-content: center;
`

export const IconDeletePhoto = styled(MaterialCommunityIcons).attrs(() => ({
  name: 'delete-outline',
  size: 18,
  color: colors.text.light
}))``

export const ContentIconCamera = styled.TouchableOpacity`
  height: 50px;
  width: 50px;
  border-radius: 25px;
  align-items: center;
  background: ${colors.primary};
  justify-content: center;
`

export const IconCamera = styled(MaterialCommunityIcons).attrs(() => ({
  name: 'camera-plus',
  size: 24,
  color: colors.text.light
}))``

export const ContentMain = styled.View`
  width: 100%;
  padding-left: 40px;
  height: 100%;
  padding-right: 40px;
  justify-content: space-between;
  align-items: center;
`

export const Body = styled.View`
  align-items: center;
  height: 80%;
  width: 100%;
  justify-content: space-between;
`

export const DescriptionText = styled.Text`
  font-family: roboto_500;
  font-size: 12px;
  text-transform: uppercase;
  margin-top: 5px;
  font-weight: bold;
  color: ${colors.primary};
`

export const ContentItems = styled.View``

export const ListItems = styled.ScrollView`
  flex: 1;
  margin-top: 10px;
  border-radius: 10px;
  border: 1px solid ${colors.secundary};
`

export const IconTextInput = styled(MaterialCommunityIcons).attrs(() => ({
  name: 'format-text-variant',
  size: 28
}))``

export const Bottom = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  height: 20%;
  justify-content: space-between;
`

export const ContentLeft = styled.View`
  width: 50%;
`

export const DescriptionContentRightText = styled.Text`
  font-family: roboto_200;
  font-size: 10px;
  color: ${colors.text.dark};
  text-transform: uppercase;
`

export const HelpContainer = styled.TouchableOpacity``

export const HelpText = styled.Text`
  font-family: roboto_700;
  font-size: 10px;
  color: ${colors.primary};
  letter-spacing: 2px;
  text-transform: uppercase;
`

export const ContentRight = styled.View`
  align-items: center;
  width: 50%;
`

export const ModalContent = styled.View`
  height: 70%;
  width: 90%;
  background: ${colors.background};
  border-radius: 22px;
`

export const ModalContentSVG = styled.View`
  height: 50%;
  width: 100%;
`

export const ModalContentBottom = styled.View`
  height: 50%;
  width: 100%;
  align-items: center;
  justify-content: space-around;
`

export const ModalContentText = styled.View`
  justify-content: space-around;
  height: 50%;
`

export const ModalSuccessText = styled.Text`
  text-transform: uppercase;
  font-family: roboto_700;
  color: ${colors.primary};
  font-size: 28px;
  text-align: center;
`

export const ModalSuccessTextDescription = styled.Text`
  text-transform: uppercase;
  font-family: roboto_700;
  color: ${colors.primary};
  font-size: 15px;
  text-align: center;
  max-width: 50%;
`

export const ModalContentButton = styled.View`
  width: 50%;
  height: 50%;
  justify-content: center;
`

export const ContentCheckLottie = styled(LottieView).attrs({
  autoPlay: true,
  hardwareAccelerationAndroid: true
})`
  flex: 1;
`
