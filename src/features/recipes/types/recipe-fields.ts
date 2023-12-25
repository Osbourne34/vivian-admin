import { RecipeMaterial } from './recipe'

export interface RecipeFields {
  name: string
  unit: string
  count: string
  active: boolean
  materials: RecipeMaterial[]
}
