import React, { createContext, useContext, useEffect, useState } from 'react'
import { getItemsApi } from '../api/items'

export type ItemsProps = {
  id: string
  title: string
  color: string
  active?: boolean
  activeColor: string
}

type ItemsContextData = {
  items: ItemsProps[]
  getItemsSelected(): ItemsProps[]
  loadItemsSelected(item: ItemsProps): void
}
const ItemsContext = createContext<ItemsContextData>({} as ItemsContextData)

export const ItemsProvider = ({
  children
}: {
  children: JSX.Element
}): JSX.Element => {
  const [itemsSelected, setItemsSelected] = useState<ItemsProps[]>([])

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

  function getItemsSelected(): ItemsProps[] {
    return itemsSelected
  }

  function loadItemsSelected(item: ItemsProps): void {
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

  return (
    <ItemsContext.Provider
      value={{ getItemsSelected, items: itemsSelected, loadItemsSelected }}
    >
      {children}
    </ItemsContext.Provider>
  )
}

export function useItemsContext(): ItemsContextData {
  return useContext(ItemsContext)
}
