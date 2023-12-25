import { Material } from '@/features/materials'
import { Product } from '@/features/products'

export interface PackageMaterial extends Material {
  type: string
  is_horeca: boolean
  states: {
    deleted: boolean
    empty: boolean
  }
}

export interface Package {
  id: number
  name: string
  product_id: string
  created_at: string
  active: boolean
}

export interface PackageDetail extends Omit<Package, 'created_at'> {
  materials: PackageMaterial[]
}
