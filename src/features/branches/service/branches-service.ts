import { http } from '@/shared/http/http'

import { Branch, BranchDetail } from '../types/branch'
import {
  ResponseWithData,
  ResponseWithMessage,
  ResponseWithPagination,
} from '@/shared/http/types'

export const BranchesService = {
  getBranches: async (params: {
    page: number
    perpage: string | null
    orderby: 'asc' | 'desc' | ''
    sort: string
    search: string
  }) => {
    const { data } = await http<ResponseWithPagination<Branch[]>>(
      'v1/branches',
      { params },
    )

    return data
  },

  getBranch: async (id: number) => {
    const { data } = await http<ResponseWithData<BranchDetail>>(
      `v1/branches/${id}/edit`,
    )

    return data
  },

  createBranch: async (body: {
    name: string
    parent_id: string
    warehouse: boolean
  }) => {
    const { data } = await http.post<ResponseWithMessage>('/v1/branches', body)

    return data
  },

  updateBranch: async ({
    body,
    id,
  }: {
    body: {
      name: string
      parent_id: string
      warehouse: boolean
    }
    id: number
  }) => {
    const { data } = await http.put<ResponseWithMessage>(
      `/v1/branches/${id}`,
      body,
    )

    return data
  },

  deleteBranch: async (id: number) => {
    const { data } = await http.delete<ResponseWithMessage>(`v1/branches/${id}`)

    return data
  },
}
