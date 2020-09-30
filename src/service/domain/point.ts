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
  items: Item[]
  account: Account
  neighborhood: string
  reference: string
  street: string
  zipCode: string
}
