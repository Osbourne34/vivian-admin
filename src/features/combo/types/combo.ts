import { Product } from '@/features/products'

export interface Combo {
  id: number
  name: string
  price: number
  point: number
}

export interface ComboItem {
  limit: number
  price: number
  point: number
  products: Product[]
}

export interface ComboDetail extends Combo {
  combos: ComboItem[]
}
