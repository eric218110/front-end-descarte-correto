import api from './index'

export type IStateItems = {
  id: string
  title: string
  color: string
  active: boolean
  activeColor: string
}

export const getItemsApi = async (): Promise<IStateItems[]> => {
  try {
    const { data } = await api.get<IStateItems[]>('item')
    if (!data) {
      return []
    }
    return data
  } catch (error) {
    return []
  }
}
