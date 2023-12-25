import { PackageMaterial } from './package'
import { Product } from '@/features/products'

export interface PackageFields {
  product_id: string
  product: Product | null
  name: string
  active: boolean
  materials: PackageMaterial[]
}
