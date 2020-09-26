import { Item } from './item'
import { Account } from './account'

export type Point = {
  id: string
  name: string
  latitude: string
  longitude: string
  city: string
  state: string
  image: string
  phone: string
  account: Account
  items: Item[]
}
