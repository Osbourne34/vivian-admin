import { http } from '@/shared/http/http'

import { MaterialType } from '../types/material-type'
import { MaterialTypeFields } from '../types/material-type-fields'

import {
  ResponseWithData,
  ResponseWithMessage,
  ResponseWithPagination,
} from '@/shared/http/types'

export const MaterialTypesService = {
  getMaterialTypes: async (params: {
    page: number
    perpage: string | null
    search: string
    sort: string
    orderby: 'asc' | 'desc' | ''
  }) => {
    const { data } = await http<ResponseWithPagination<MaterialType[]>>(
      'v1/material-types',
      { params },
    )

    return data
  },

  getMaterialType: async (id: number) => {
    const { data } = await http<ResponseWithData<MaterialType>>(
      `v1/material-types/${id}/edit`,
    )

    return data
  },

  createMaterialType: async (body: MaterialTypeFields) => {
    const { data } = await http.post<ResponseWithMessage>(
      'v1/material-types',
      body,
    )

    return data
  },

  updateMaterialType: async ({
    id,
    body,
  }: {
    id: number
    body: MaterialTypeFields
  }) => {
    const { data } = await http.put<ResponseWithMessage>(
      `v1/material-types/${id}`,
      body,
    )

    return data
  },

  deleteMaterialType: async (id: number) => {
    const { data } = await http.delete<ResponseWithMessage>(
      `v1/material-types/${id}`,
    )

    return data
  },
}
