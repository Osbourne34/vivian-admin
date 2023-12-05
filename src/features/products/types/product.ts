export interface Product {
  id: number
  name: string
  price: number
  point: number
  horeca_price: number
  horeca_point: number
  unit: string
  volume: number
  image: string
}

export interface ProductDetail extends Product {
  category_id: number
  brand: string
  mode_app: string
  description: string | null
  conditions: string
  keeping: number
}
