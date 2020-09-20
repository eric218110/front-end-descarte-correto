import React, { useCallback } from 'react'
import { Container, Content } from './style'
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export const Action = (): JSX.Element => {
  const navigation = useNavigation()

  const handleNavigate = useCallback(() => {
    navigation.navigate('AddPoint')
  }, [])

  return (
    <Container>
      <Content>
        <Feather name="filter" size={24} color="#FFF" />
      </Content>
      <Content>
        <Ionicons name="md-locate" size={24} color="#FFF" />
      </Content>
      <Content onPress={() => handleNavigate()}>
        <MaterialIcons name="add" size={24} color="#FFF" />
      </Content>
    </Container>
  )
}
