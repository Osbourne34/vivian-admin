import { Material } from '@/features/materials'

export interface RecipeMaterial extends Material {
  type: string
  states: {
    deleted: boolean
    empty: boolean
  }
}

export interface Recipe {
  id: number
  name: string
  unit: string
  count: number
  created_at: string
  active: boolean
}

export interface RecipeDetail extends Omit<Recipe, 'created_at'> {
  materials: RecipeMaterial[]
}
