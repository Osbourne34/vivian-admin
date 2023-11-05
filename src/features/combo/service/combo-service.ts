import { http } from '@/shared/http/http'

import { Combo, ComboDetail } from '../types/combo'
import { ComboFields } from '../types/combo-fields'

import {
  ResponseWithData,
  ResponseWithMessage,
  ResponseWithPagination,
} from '@/shared/http/types'

export const ComboService = {
  getCombos: async (params: {
    page: number
    perpage: string | null
    search: string
    sort: string
    orderby: 'asc' | 'desc' | ''
  }) => {
    const { data } = await http<ResponseWithPagination<Combo[]>>(`v1/combos`, {
      params,
    })

    return data
  },

  getCombo: async (id: number) => {
    const { data } = await http<ResponseWithData<ComboDetail>>(
      `v1/combos/${id}/edit`,
    )

    return data
  },

  createCombo: async (body: ComboFields) => {
    const { data } = await http.post<ResponseWithMessage>(`v1/combos`, body)

    return data
  },

  updateCombo: async ({ id, body }: { id: number; body: ComboFields }) => {
    const { data } = await http.put(`v1/combos/${id}`, body)

    return data
  },

  deleteCombo: async (id: number) => {
    const { data } = await http.delete<ResponseWithMessage>(`v1/combos/${id}`)

    return data
  },
}
