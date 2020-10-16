import styled from 'styled-components/native'
import MapViewDirections from 'react-native-maps-directions'

export const MapViewDirectionsStyled = styled(MapViewDirections).attrs(
  ({ theme }) => ({
    strokeColor: theme.primary400,
    strokeWidth: 3
  })
)``
