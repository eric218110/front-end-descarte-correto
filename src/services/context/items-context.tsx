import React, { createContext, useContext, useEffect, useState } from 'react'
import { getItemsApi, AddItemProps, addItemApi } from '../api/items'
import { ResponseType } from '../api'
import { Item } from '../domain/item'

type ItemsContextData = {
  items: Item[]
  getItemsSelected(): Item[]
  loadItemsSelected(item: Item): void
  addItem(item: AddItemProps): Promise<ResponseType<Item>>
}
const ItemsContext = createContext<ItemsContextData>({} as ItemsContextData)

export const ItemsProvider = ({
  children
}: {
  children: JSX.Element
}): JSX.Element => {
  const [itemsSelected, setItemsSelected] = useState<Item[]>([])

  useEffect(() => {
    async function getItems() {
      const items = await getItemsApi()
      items.map(item => {
        item.active = false
      })
      setItemsSelected(items)
    }
    getItems()
  }, [])

  function getItemsSelected(): Item[] {
    return itemsSelected
  }

  function loadItemsSelected(item: Item): void {
    const internalItems = [...itemsSelected]
    const ids = internalItems.map(({ id }) => id)

    const itemExist = ids.find(id => id === item.id)

    if (!itemExist) {
      internalItems.push(item)
    } else {
      const index = ids.findIndex(id => id === item.id)
      internalItems[index].active = !internalItems[index].active
    }

    setItemsSelected(internalItems)
  }

  async function addItem(item: AddItemProps): Promise<ResponseType<Item>> {
    const { dataResponse, error } = await addItemApi(item)
    if (!error && dataResponse) {
      const items = await getItemsApi()
      items.map(item => {
        item.active = false
      })
      setItemsSelected(items)
      return {
        dataResponse: dataResponse,
        error: ''
      }
    }
    return { dataResponse, error }
  }

  return (
    <ItemsContext.Provider
      value={{
        getItemsSelected,
        items: itemsSelected,
        loadItemsSelected,
        addItem
      }}
    >
      {children}
    </ItemsContext.Provider>
  )
}

export function useItemsContext(): ItemsContextData {
  return useContext(ItemsContext)
}
