import { Product } from '@/features/products'

export interface ComboItem {
  id: number | string
  limit: string
  products: Product[]
}

export interface ComboFields {
  name: string
  price: string
  point: string
  combos: ComboItem[]
}
