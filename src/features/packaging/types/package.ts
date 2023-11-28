import { Material } from '@/features/materials'

interface PackageMaterial extends Material {
  type: string
}

export interface Package {
  id: number
  name: string
  created_at: string
  active: boolean
}

export interface PackageDetail extends Omit<Package, 'created_at'> {
  materials: PackageMaterial[]
}
