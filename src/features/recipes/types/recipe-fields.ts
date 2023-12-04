import { RecipeMaterial } from './recipe'

export interface RecipeFields {
  name: string
  count: string
  active: boolean
  materials: RecipeMaterial[]
}
