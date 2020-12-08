import styled from 'styled-components/native'
import LottieView from 'lottie-react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Dimensions } from 'react-native'
import { Form } from '@unform/mobile'
const { height, width } = Dimensions.get('window')

export const Container = styled.SafeAreaView`
  height: ${height}px;
  width: ${width}px;
  background: ${({ theme }) => theme.background};
  justify-content: center;
  align-items: center;
  margin: auto;
  flex: 1;
`

export const ImageContainer = styled.View`
  width: 100%;
  height: 30%;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.backgroundSecundary};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
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
  background: ${({ theme }) => theme.primary};
  justify-content: center;
`

export const IconDeletePhoto = styled(MaterialCommunityIcons).attrs(
  ({ theme }) => ({
    name: 'delete-outline',
    size: 18,
    color: theme.text.light
  })
)``

export const ContentIconCamera = styled.TouchableOpacity`
  height: 50px;
  width: 50px;
  border-radius: 25px;
  align-items: center;
  background: ${({ theme }) => theme.primary};
  justify-content: center;
`

export const IconCamera = styled(MaterialCommunityIcons).attrs(({ theme }) => ({
  name: 'camera-plus',
  size: 24,
  color: theme.text.light
}))``

export const FormContent = styled(Form)`
  height: 70%;
  align-items: center;
  width: 90%;
  max-width: 360px;
  margin: auto;
`

export const Body = styled.View`
  align-items: center;
  flex: 1;
  width: 100%;
  justify-content: space-between;
`

export const ListItems = styled.ScrollView`
  flex: 1;
  margin-top: 10px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.secundary};
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
  color: ${({ theme }) => theme.text.dark};
  text-transform: uppercase;
`

export const HelpContainer = styled.TouchableOpacity``

export const HelpText = styled.Text`
  font-family: roboto_700;
  font-size: 10px;
  color: ${({ theme }) => theme.primary};
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
  background: ${({ theme }) => theme.background};
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
  color: ${({ theme }) => theme.primary};
  font-size: 28px;
  text-align: center;
`

export const ModalSuccessTextDescription = styled.Text`
  text-transform: uppercase;
  font-family: roboto_700;
  color: ${({ theme }) => theme.primary};
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
