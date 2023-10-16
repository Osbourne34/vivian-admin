import { http } from '@/shared/http/http'

import { Role } from '../types/role'

import {
  ResponseWithData,
  ResponseWithMessage,
  ResponseWithPagination,
} from '@/shared/http/types'

export const RolesService = {
  getRoles: async (params: {
    page: number
    perpage: string | null
    sort: string
    orderby: 'asc' | 'desc' | ''
    search: string
  }) => {
    const { data } = await http<ResponseWithPagination<Role[]>>('api/roles', {
      params,
    })

    return data
  },

  getRole: async (id: number) => {
    const { data } = await http<ResponseWithData<Role>>(`api/roles/${id}/edit`)

    return data
  },

  createRole: async (body: { name: string; permissions: string[] }) => {
    const { data } = await http.post<ResponseWithMessage>('api/roles', body)

    return data
  },

  updateRole: async ({
    id,
    body,
  }: {
    id: number
    body: { name: string; permissions: string[] }
  }) => {
    const { data } = await http.post<ResponseWithMessage>(`api/roles/${id}`, {
      ...body,
      _method: 'PUT',
    })

    return data
  },

  deleteRole: async (id: number) => {
    const { data } = await http.delete<ResponseWithMessage>(`api/roles/${id}`)

    return data
  },
}
