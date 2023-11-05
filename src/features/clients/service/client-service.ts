import { http } from '@/shared/http/http'

import { Client, ClientDetail } from '../types/client'

import {
  ResponseWithData,
  ResponseWithMessage,
  ResponseWithPagination,
} from '@/shared/http/types'

export const ClientsService = {
  getClients: async (params: {
    page: number
    perpage: string | null
    orderby: 'asc' | 'desc' | ''
    sort: string
    search: string
    branch_id: string | null
    sortbyverified: string | null
    sortbyactivity: string | null
    manager_id: string | null
  }) => {
    const { data } = await http<ResponseWithPagination<Client[]>>(
      'v1/clients',
      {
        params,
      },
    )

    return data
  },

  getClient: async (id: number) => {
    const { data } = await http<ResponseWithData<ClientDetail>>(
      `v1/clients/${id}/edit`,
    )

    return data
  },

  createClient: async (body: FormData) => {
    const { data } = await http.post<ResponseWithMessage>('v1/clients', body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return data
  },

  updateClient: async ({ id, body }: { id: number; body: FormData }) => {
    const { data } = await http.post<ResponseWithMessage>(
      `v1/clients/${id}`,
      body,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )

    return data
  },

  deleteClient: async (id: number) => {
    const { data } = await http.delete<ResponseWithMessage>(`v1/clients/${id}`)

    return data
  },
}
