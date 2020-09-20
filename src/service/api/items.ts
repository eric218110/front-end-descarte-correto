import api from './index'

type IStateItems = {
  id: string
  title: string
  image: string
  color: string
  activeColor: string
}

export const getItemsApi = async (): Promise<IStateItems[]> => {
  try {
    const { data } = await api.get<IStateItems[]>('itwem')
    if (!data) {
      return []
    }
    return data
  } catch (error) {
    return []
  }
}
