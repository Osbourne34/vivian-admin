import { http } from '@/shared/http/http'

import { Product, ProductDetail } from '../types/product'

import {
  ResponseWithData,
  ResponseWithMessage,
  ResponseWithPagination,
} from '@/shared/http/types'

export const ProductsService = {
  getProducts: async (params: {
    page: number
    perpage: string | null
    search: string
    sort: string
    orderby: string
    category_id: string | null
  }) => {
    const { data } = await http<ResponseWithPagination<Product[]>>(
      `api/products`,
      {
        params,
      },
    )

    return data
  },

  getProduct: async (id: number) => {
    const { data } = await http<ResponseWithData<ProductDetail>>(
      `api/products/${id}/edit`,
    )

    return data
  },

  createProduct: async (body: FormData) => {
    const { data } = await http.post<ResponseWithMessage>(
      `api/products`,
      body,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )

    return data
  },

  updateProduct: async ({ id, body }: { id: number; body: FormData }) => {
    const { data } = await http.post<ResponseWithMessage>(
      `api/products/${id}`,
      body,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )

    return data
  },

  deleteProduct: async (id: number) => {
    const { data } = await http.delete<ResponseWithMessage>(
      `api/products/${id}`,
    )

    return data
  },
}
