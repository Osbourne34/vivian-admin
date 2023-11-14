import { http } from '@/shared/http/http'

import {
  IndividualPrice,
  IndividualPriceEdit,
  IndividualPriceShow,
} from '../types/individual-price'

import {
  ResponseWithData,
  ResponseWithMessage,
  ResponseWithPagination,
} from '@/shared/http/types'
import { PriceFields } from '../types/price-fields'

export const PricesService = {
  getPrices: async (params: {
    page: number
    perpage: string | null
    orderby: 'asc' | 'desc' | ''
    sort: string
    search: string
  }) => {
    const { data } = await http<ResponseWithPagination<IndividualPrice[]>>(
      'v1/prices',
      {
        params,
      },
    )

    return data
  },

  getPrice: async (id: number) => {
    const { data } = await http<ResponseWithData<IndividualPriceEdit>>(
      `v1/prices/${id}/edit`,
    )

    return data
  },

  showPrice: async (id: number) => {
    const { data } = await http<ResponseWithData<IndividualPriceShow>>(
      `v1/prices/${id}`,
    )

    return data
  },

  createPrice: async (body: PriceFields) => {
    const { data } = await http.post<ResponseWithMessage>(`v1/prices`, body)

    return data
  },

  updatePrice: async ({ id, body }: { id: number; body: PriceFields }) => {
    const { data } = await http.put<ResponseWithMessage>(
      `v1/prices/${id}`,
      body,
    )

    return data
  },

  deletePrice: async (id: number) => {
    const { data } = await http.delete<ResponseWithMessage>(`v1/prices/${id}`)

    return data
  },
}
