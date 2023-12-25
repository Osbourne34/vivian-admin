import { http } from '@/shared/http/http'

import {
  SemiFinished,
  SemiFinishedMaterial,
  SemiFinishedStatus,
  SemiFinishedWithDescription,
} from '../types/semi-finished'
import { CreateSemiFinishedFields } from '../types/create-semi-finished-fields'
import { UpdateSemiFinishedFields } from '../types/update-semi-finished-fields'

import {
  ResponseWithData,
  ResponseWithMessage,
  ResponseWithPagination,
} from '@/shared/types/http'

export const SemiFinishedsService = {
  getSemiFinisheds: async (params: {
    page: number
    search: string
    perpage: string | null
    sort: string
    orderby: string
    recipe_id: string | null
    status: string | null
  }) => {
    const { data } = await http<ResponseWithPagination<SemiFinished[]>>(
      'v1/semifinisheds',
      {
        params,
      },
    )

    return data
  },

  showSemiFinished: async (semiFinishedId: number) => {
    const { data } = await http<ResponseWithData<SemiFinishedMaterial[]>>(
      `v1/semifinisheds/${semiFinishedId}`,
    )

    return data
  },

  getSemiFinished: async (semiFinishedId: number) => {
    const { data } = await http<ResponseWithData<SemiFinishedWithDescription>>(
      `v1/semifinisheds/${semiFinishedId}/edit`,
    )

    return data
  },

  createSemiFinished: async (body: CreateSemiFinishedFields) => {
    const { data } = await http.post<ResponseWithMessage>(
      'v1/semifinisheds',
      body,
    )

    return data
  },

  updateSemiFinished: async ({
    semiFinishedId,
    body,
  }: {
    semiFinishedId: number
    body: UpdateSemiFinishedFields
  }) => {
    const { data } = await http.put<ResponseWithMessage>(
      `v1/semifinisheds/${semiFinishedId}`,
      body,
    )

    return data
  },

  deleteSemiFinished: async (semiFinishedId: number) => {
    const { data } = await http.delete<ResponseWithMessage>(
      `v1/semifinisheds/${semiFinishedId}`,
    )

    return data
  },

  getSemiFinishedStatuses: async () => {
    const { data } = await http<
      ResponseWithData<
        {
          title: string
          value: SemiFinishedStatus
        }[]
      >
    >('v1/filter/semifinisheds/statuses')

    return data
  },
}
