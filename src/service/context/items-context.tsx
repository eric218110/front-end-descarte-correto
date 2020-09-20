import React, { createContext, useContext, useEffect, useState } from 'react'
import { getItemsApi } from '../api/items'

type IItemsProps = {
  id: string
  title: string
  color: string
  active?: boolean
  activeColor: string
}

type ItemsContextData = {
  items: IItemsProps[]
  getItemsSelected(): IItemsProps[]
  loadItemsSelected(item: IItemsProps): void
}
const ItemsContext = createContext<ItemsContextData>({} as ItemsContextData)

export const ItemsProvider = ({
  children
}: {
  children: JSX.Element
}): JSX.Element => {
  const [itemsSelected, setItemsSelected] = useState<IItemsProps[]>([])

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

  function getItemsSelected(): IItemsProps[] {
    return itemsSelected
  }

  function loadItemsSelected(item: IItemsProps): void {
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
