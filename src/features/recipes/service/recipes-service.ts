import { Recipe, RecipeDetail } from '../types/recipe'
import { RecipeFields } from '@/features/recipes/types/recipe-fields'

import { http } from '@/shared/http/http'
import {
  ResponseWithData,
  ResponseWithMessage,
  ResponseWithPagination,
} from '@/shared/types/http'

export const RecipesService = {
  getRecipes: async (params: {
    page: number
    search: string
    perpage: string | null
    sort: string
    orderby: 'asc' | 'desc' | ''
  }) => {
    const { data } = await http<ResponseWithPagination<Recipe[]>>(
      `/v1/recipes`,
      {
        params,
      },
    )

    return data
  },

  showRecipe: async (id: number) => {
    const { data } = await http<ResponseWithData<RecipeDetail['materials']>>(
      `/v1/recipes/${id}`,
    )

    return data
  },

  getRecipe: async (id: number) => {
    const { data } = await http<ResponseWithData<RecipeDetail>>(
      `/v1/recipes/${id}/edit`,
    )

    return data
  },

  createRecipe: async (body: RecipeFields) => {
    const { data } = await http.post<ResponseWithMessage>(`/v1/recipes`, body)

    return data
  },

  updateRecipe: async ({ id, body }: { id: number; body: RecipeFields }) => {
    const { data } = await http.put<ResponseWithMessage>(
      `/v1/recipes/${id}`,
      body,
    )

    return data
  },

  deleteRecipe: async (id: number) => {
    const { data } = await http.delete<ResponseWithMessage>(`/v1/recipes/${id}`)

    return data
  },
}
