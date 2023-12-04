import { ProductWithState } from './combo'

export interface ComboItem {
  id: number | string
  limit: string
  products: ProductWithState[]
}

export interface ComboFields {
  name: string
  price: string
  point: string
  combos: ComboItem[]
}
