import api from './index'
import { Point } from '../domain/point'

type PickAccountIdNameEmail = {
  id: string
  name: string
  email: string
}

export interface ResponseListPoints extends Omit<Point, 'account'> {
  account: PickAccountIdNameEmail
}

export const getPointsFilterApi = async ({
  ids
}: {
  ids: string
}): Promise<ResponseListPoints[]> => {
  try {
    const { data } = await api.get<ResponseListPoints[]>(`points/filter/${ids}`)
    if (!data) {
      return []
    }
    return data
  } catch (error) {
    return []
  }
}

export const getPointsApi = async (): Promise<ResponseListPoints[]> => {
  try {
    const { data } = await api.get<ResponseListPoints[]>('points')
    if (!data) {
      return []
    }
    return data
  } catch (error) {
    return []
  }
}

export type ResponseAddPointsProps = {
  error: string
  data: boolean
}
export interface AddPointsProps
  extends Omit<Point, 'items' | 'account' | 'id' | 'image'> {
  items: string
  file: string
  token: string
}

export const addPointApi = async ({
  token,
  file,
  city,
  items,
  latitude,
  longitude,
  name,
  neighborhood,
  reference,
  state,
  street,
  zipCode
}: AddPointsProps): Promise<ResponseAddPointsProps> => {
  try {
    const fileData = {
      uri: file,
      type: 'image/jpeg',
      name: Math.random().toString() + '-file-image-hash.jpg'
    }
    const bodyRequest = new FormData()
    bodyRequest.append('file', fileData)
    bodyRequest.append('city', city)
    bodyRequest.append('items', items)
    bodyRequest.append('latitude', latitude)
    bodyRequest.append('longitude', longitude)
    bodyRequest.append('name', name)
    bodyRequest.append('neighborhood', neighborhood)
    bodyRequest.append('reference', reference)
    bodyRequest.append('state', state)
    bodyRequest.append('street', street)
    bodyRequest.append('zipCode', zipCode)

    await api.post('point', bodyRequest, {
      headers: {
        'x-access-token': token
      }
    })
    return {
      data: true,
      error: ''
    }
  } catch (error) {
    if (error.response) {
      return {
        data: false,
        error: error.response.data.error
      }
    } else if (error.request) {
      return {
        data: false,
        error: 'Erro ao cadastrar, tente novamente'
      }
    } else {
      return {
        data: false,
        error: 'Erro ao cadastrar, tente novamente em instantes'
      }
    }
  }
}

type ResponseOnePoint = {
  error: string
  data: ResponseListPoints | null
}

export const getOnePointApi = async ({
  id
}: {
  id: string
}): Promise<ResponseOnePoint> => {
  try {
    const { data } = await api.get<ResponseListPoints>(`point/${id}`)
    return {
      error: '',
      data
    }
  } catch (error) {
    if (error.response) {
      return {
        data: null,
        error: error.response.data.error
      }
    } else if (error.request) {
      return {
        data: null,
        error: 'Erro ao buscar, tente novamente'
      }
    } else {
      return {
        data: null,
        error: 'Erro ao listar ponto'
      }
    }
    return {
      data: null,
      error: 'Erro ao buscar'
    }
  }
}
