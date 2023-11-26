import { Material } from '@/features/materials'

export interface RecipeFields {
  name: string
  active: boolean
  materials: Material[]
}
