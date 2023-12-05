import { ProductDetail } from './product'

export interface ProductFields
  extends Omit<
    ProductDetail,
    | 'id'
    | 'image'
    | 'category_id'
    | 'price'
    | 'keeping'
    | 'point'
    | 'horeca_price'
    | 'horeca_point'
    | 'volume'
  > {
  image: File | null | string
  category_id: string
  price: string
  keeping: string
  point: string
  horeca_price: string
  horeca_point: string
  volume: string
}
