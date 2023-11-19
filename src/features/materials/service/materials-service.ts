import { http } from '@/shared/http/http'

import { Material } from '../types/material'
import { MaterialFields } from '../types/material-fields'

import {
  ResponseWithData,
  ResponseWithMessage,
  ResponseWithPagination,
} from '@/shared/types/http'

export const MaterialsService = {
  getMaterials: async (params: {
    page: number
    perpage: string | null
    search: string
    orderby: 'asc' | 'desc' | ''
    sort: string
    type_id: string | null
  }) => {
    const { data } = await http<ResponseWithPagination<Material[]>>(
      'v1/materials',
      { params },
    )

    return data
  },

  getMaterial: async (id: number) => {
    const { data } = await http<ResponseWithData<Material>>(
      `v1/materials/${id}/edit`,
    )

    return data
  },

  createMaterial: async (body: MaterialFields) => {
    const { data } = await http.post<ResponseWithMessage>('v1/materials', body)

    return data
  },

  updateMaterial: async ({
    id,
    body,
  }: {
    id: number
    body: MaterialFields
  }) => {
    const { data } = await http.post<ResponseWithMessage>(
      `v1/materials/${id}`,
      { ...body, _method: 'PUT' },
    )

    return data
  },

  deleteMaterial: async (id: number) => {
    const { data } = await http.delete<ResponseWithMessage>(
      `v1/materials/${id}`,
    )

    return data
  },
}
