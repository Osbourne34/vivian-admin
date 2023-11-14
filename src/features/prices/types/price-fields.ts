import { Product } from '@/features/products'

export interface PriceFields {
  name: string
  active: boolean
  products: Product[]
  employees: string[]
}
