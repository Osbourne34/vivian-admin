import { http } from '@/shared/http/http'
import { Orient } from '../types/orient'

import {
  ResponseWithData,
  ResponseWithMessage,
  ResponseWithPagination,
} from '@/shared/http/types'

export const OrientsService = {
  getOrients: async (params: {
    page: number
    perpage: string | null
    search: string
    sort: string
    orderby: string
    branch_id: string | null
  }) => {
    const { data } = await http<ResponseWithPagination<Orient[]>>(
      `v1/orients`,
      {
        params,
      },
    )

    return data
  },

  getOrient: async (id: number) => {
    const { data } = await http<ResponseWithData<Orient>>(
      `v1/orients/${id}/edit`,
    )

    return data
  },

  createOrient: async (body: { name: string; branch_id: string }) => {
    const { data } = await http.post<ResponseWithMessage>(`v1/orients`, body)

    return data
  },

  updateOrient: async ({
    id,
    body,
  }: {
    id: number
    body: { name: string; branch_id: string }
  }) => {
    const { data } = await http.put<ResponseWithMessage>(
      `v1/orients/${id}`,
      body,
    )

    return data
  },

  deleteOrient: async (id: number) => {
    const { data } = await http.delete<ResponseWithMessage>(`v1/orients/${id}`)

    return data
  },
}
