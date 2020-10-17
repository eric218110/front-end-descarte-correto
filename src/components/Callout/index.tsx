import React from 'react'
import {
  CalloutContainerStyled,
  ContainerCallout,
  LeftContainerCallout,
  DividerCallout,
  RightContainerCallout,
  IconLinkDetailsPoint,
  TriangleCallout,
  CalloutColors,
  ContainerCalloutBottom,
  ContainerCalloutTop,
  TextCallout,
  DividerCalloutHorizontal,
  TextCalloutDescription
} from './styles'

type CalloutProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onPress: (event: any) => void
  colorsItems: string[]
  title: string
}

export const Callout = ({
  onPress,
  colorsItems,
  title
}: CalloutProps): JSX.Element => {
  return (
    <CalloutContainerStyled onPress={onPress}>
      <ContainerCallout>
        <LeftContainerCallout>
          <ContainerCalloutTop>
            <TextCallout>{title}</TextCallout>
            <TextCalloutDescription>{title}</TextCalloutDescription>
          </ContainerCalloutTop>
          <DividerCalloutHorizontal />
          <ContainerCalloutBottom>
            {colorsItems.map(color => (
              <CalloutColors key={Math.random()} color={color} />
            ))}
          </ContainerCalloutBottom>
        </LeftContainerCallout>
        <DividerCallout />
        <RightContainerCallout>
          <IconLinkDetailsPoint />
        </RightContainerCallout>
      </ContainerCallout>
      <TriangleCallout />
    </CalloutContainerStyled>
  )
}
