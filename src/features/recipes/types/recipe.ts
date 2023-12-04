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
  created_at: string
  count: number
  active: boolean
}

export interface RecipeDetail extends Omit<Recipe, 'created_at'> {
  materials: RecipeMaterial[]
}
