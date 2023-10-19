export interface Product {
  id: number
  name: string
  price: number
  point: number
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
