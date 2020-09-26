import api from './index'

type Items = {
  id: string
  title: string
  color: string
  active: boolean
  activeColor: string
}

type Account = {
  id: string
  name: string
  email: string
}

export type PointsProps = {
  id: string
  name: string
  latitude: string
  longitude: string
  city: string
  state: string
  image: string
  phone: string
  account: Account
  items: Items[]
}

export const getPointsApi = async (): Promise<PointsProps[]> => {
  try {
    const { data } = await api.get<PointsProps[]>('points')
    if (!data) {
      return []
    }
    return data
  } catch (error) {
    return []
  }
}
