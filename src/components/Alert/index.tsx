import React, { useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import {
  Wrapper,
  Container,
  Divider,
  ContentText,
  Title,
  Description,
  ContentIcon
} from './style'
import { Animated } from 'react-native'

type IProps = {
  backgroundColor: string
  colorActions: string
  iconName: string
  title: string
  description: string
}

const opacity = new Animated.Value(0)

export const AlertAnimated = ({
  backgroundColor,
  iconName,
  colorActions,
  title,
  description
}: IProps): JSX.Element => {
  const [offSet] = useState(new Animated.ValueXY({ x: 0, y: 220 }))

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }),
      Animated.spring(offSet.y, {
        toValue: 100,
        speed: 4,
        bounciness: 13,
        useNativeDriver: true
      })
    ]).start()
  }, [opacity])
  return (
    <Wrapper
      style={{
        opacity: opacity,
        transform: [
          {
            translateY: offSet.y
          }
        ]
      }}
    >
      <Container backgroundColor={backgroundColor}>
        <Divider color={colorActions} />
        <ContentIcon color={colorActions}>
          <MaterialCommunityIcons name={iconName} size={18} color="#FFF" />
        </ContentIcon>
        <ContentText>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </ContentText>
      </Container>
    </Wrapper>
  )
}

export const AlertAnimatedSuccessLoggout = (): JSX.Element => (
  <AlertAnimated
    title="Logout"
    description="Sucesso no logout"
    backgroundColor="#AFC996"
    colorActions="#072602"
    iconName="check"
  />
)
