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

export const Filter: React.FC = () => {
  const { loadItemsSelected, getItemsSelected } = useItemsContext()
  const selectedsItems = getItemsSelected()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (selectedsItems !== undefined) setLoading(false)
  }, [])

  const lengthSelected = useCallback(() => {
    let length = selectedsItems.map(({ active }) => (active ? 1 : '')).join()
    length = length.replace(',', '')
    return length.length - 2
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
                <Text>Filter items</Text>
                <Text>{`Selecteds ${lengthSelected()}`}</Text>
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
                <Text>Clear all</Text>
              </Bottom>
            </>
          ) : (
            <ContainerEmpty>
              <ContentEmptyLottieView
                source={require('../../../assets/lottie/empty.json')}
              />
              <TextEmpty>List Empty</TextEmpty>
            </ContainerEmpty>
          )}
        </ListItems>
      )}
    </Container>
  )
}
