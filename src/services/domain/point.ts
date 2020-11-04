import { Item } from './item'
import { Account } from './account'

export type Point = {
  id: string
  placeName: string
  referencePoint: string
  locationType: string
  latitude: string
  longitude: string
  image: string
  items: Item[]
  account: Account
}
