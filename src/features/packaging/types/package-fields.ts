import { Material } from '@/features/materials'

export interface PackageFields {
  name: string
  active: boolean
  materials: Material[]
}
