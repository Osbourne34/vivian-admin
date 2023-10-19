import { ProductDetail } from './product'

export interface ProductFields
  extends Omit<
    ProductDetail,
    'id' | 'image' | 'category_id' | 'price' | 'keeping' | 'point'
  > {
  image: File | null | string
  category_id: string
  price: string
  keeping: string
  point: string
}
