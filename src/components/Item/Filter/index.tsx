import React, { useCallback, useEffect, useState } from 'react'
import {
  Container,
  Header,
  Text,
  ListItems,
  ItemContent,
  NameItem,
  Bottom,
  ContainerEmpty,
  ContentEmptyLottieView,
  TextEmpty
} from './styles'
import { Checkbox } from 'react-native-paper'
import { Loading } from '../../Loading'
import { View } from 'react-native'
import { useItemsContext } from '../../../service/context/items-context'

type FilterItemsProps = {
  title: string
}

export const Filter = ({ title }: FilterItemsProps): JSX.Element => {
  const { loadItemsSelected, getItemsSelected } = useItemsContext()
  const selectedsItems = getItemsSelected()
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    if (selectedsItems !== undefined) setLoading(false)
  }, [])

  const lengthSelected = useCallback(() => {
    const length = selectedsItems.map(({ active }) => (active ? 1 : 0))
    let x = ''
    length.map(stringLength => {
      if (stringLength === 1) {
        x = x + 'x'
      }
    })
    return x.length
  }, [])

  return (
    <Container>
      {loading ? (
        <View
          style={{
            marginTop: '60%'
          }}
        >
          <Loading />
        </View>
      ) : (
        <ListItems>
          {selectedsItems.length !== 0 ? (
            <>
              <Header>
                <Text>{title}</Text>
                <Text>{`selecionados ${lengthSelected()}`}</Text>
              </Header>
              {selectedsItems.map(
                ({ id, color, activeColor, title, active }) => (
                  <ItemContent
                    key={id}
                    onPress={() => {
                      loadItemsSelected({
                        color,
                        activeColor,
                        title,
                        id,
                        active: !active
                      })
                    }}
                    background={color}
                    active={active}
                  >
                    <Checkbox
                      color={activeColor}
                      status={active ? 'checked' : 'unchecked'}
                    />
                    <NameItem active={active} color={activeColor}>
                      {title}
                    </NameItem>
                  </ItemContent>
                )
              )}
              <Bottom>
                <Text>limpar todos</Text>
              </Bottom>
            </>
          ) : (
            <ContainerEmpty>
              <ContentEmptyLottieView
                source={require('../../../assets/lottie/empty.json')}
              />
              <TextEmpty>zero items :|</TextEmpty>
            </ContainerEmpty>
          )}
        </ListItems>
      )}
    </Container>
  )
}
