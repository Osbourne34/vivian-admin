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
      'v1/categories',
      {
        params,
      },
    )

    return data
  },

  getCategory: async (id: number) => {
    const { data } = await http<ResponseWithData<Category>>(
      `v1/categories/${id}/edit`,
    )

    return data
  },

  createCategory: async (body: { name: string }) => {
    const { data } = await http.post<ResponseWithMessage>('v1/categories', body)

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
      `v1/categories/${id}`,
      body,
    )

    return data
  },

  deleteCategoty: async (id: number) => {
    const { data } = await http.delete<ResponseWithMessage>(
      `v1/categories/${id}`,
    )

    return data
  },
}
