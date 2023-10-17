import { http } from '@/shared/http/http'

import { Category } from '../types/category'

import {
  ResponseWithData,
  ResponseWithMessage,
  ResponseWithPagination,
} from '@/shared/http/types'

export const CategoriesService = {
  getCategories: async (params: {
    page: number
    perpage: string | null
    search: string
    sort: string
    orderby: 'asc' | 'desc' | ''
  }) => {
    const { data } = await http<ResponseWithPagination<Category[]>>(
      'api/categories',
      {
        params,
      }
    )

    return data
  },

  getCategory: async (id: number) => {
    const { data } = await http<ResponseWithData<Category>>(
      `api/categories/${id}/edit`
    )

    return data
  },

  createCategory: async (body: { name: string }) => {
    const { data } = await http.post<ResponseWithMessage>(
      'api/categories',
      body
    )

    return data
  },

  updateCategory: async ({
    id,
    body,
  }: {
    id: number
    body: { name: string }
  }) => {
    const { data } = await http.put<ResponseWithMessage>(
      `api/categories/${id}`,
      body
    )

    return data
  },

  deleteCategoty: async (id: number) => {
    const { data } = await http.delete<ResponseWithMessage>(
      `api/categories/${id}`
    )

    return data
  },
}
