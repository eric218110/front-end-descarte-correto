import api, { ResponseType } from './index'
import { Item } from '../domain/item'

export const getItemsApi = async (): Promise<Item[]> => {
  try {
    const { data } = await api.get<Item[]>('item')
    if (!data) {
      return []
    }
    return data
  } catch (error) {
    return []
  }
}

export interface AddItemProps extends Omit<Item, 'id' | 'active'> {
  accessToken: string
}

export const addItemApi = async ({
  title,
  description,
  color,
  activeColor,
  accessToken
}: AddItemProps): Promise<ResponseType<Item>> => {
  try {
    const { data } = await api.post<Item>(
      'item',
      {
        title,
        description,
        color,
        activeColor
      },
      {
        headers: {
          'x-access-token': accessToken
        }
      }
    )
    if (!data) {
      return {
        error: '',
        dataResponse: {} as Item
      }
    }
    return {
      error: '',
      dataResponse: {} as Item
    }
  } catch (error) {
    if (error.response) {
      return {
        dataResponse: null,
        error: error.response.data.error
      }
    } else if (error.request) {
      return {
        dataResponse: null,
        error: 'Erro ao cadastrar, tente novamente'
      }
    } else {
      return {
        dataResponse: null,
        error: 'Erro ao cadastrar'
      }
    }
  }
}
