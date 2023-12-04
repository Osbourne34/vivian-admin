import { Material } from '@/features/materials'

export interface RecipeFields {
  name: string
  count: string
  active: boolean
  materials: Material[]
}
