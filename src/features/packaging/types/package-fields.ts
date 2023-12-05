import { PackageMaterial } from './package'

export interface PackageFields {
  name: string
  active: boolean
  materials: PackageMaterial[]
}
