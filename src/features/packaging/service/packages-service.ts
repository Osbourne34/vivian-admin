import { Package, PackageDetail } from '../types/package'
import { PackageFields } from '../types/package-fields'

import { http } from '@/shared/http/http'
import {
  ResponseWithData,
  ResponseWithMessage,
  ResponseWithPagination,
} from '@/shared/types/http'

export const PackagesService = {
  getPackages: async (params: {
    page: number
    search: string
    perpage: string | null
    sort: string
    orderby: 'asc' | 'desc' | ''
  }) => {
    const { data } = await http<ResponseWithPagination<Package[]>>(
      `/v1/packaging`,
      {
        params,
      },
    )

    return data
  },

  showPackage: async (id: number) => {
    const { data } = await http<ResponseWithData<PackageDetail['materials']>>(
      `/v1/packaging/${id}`,
    )

    return data
  },

  getPackage: async (id: number) => {
    const { data } = await http<ResponseWithData<PackageDetail>>(
      `/v1/packaging/${id}/edit`,
    )

    return data
  },

  createPackage: async (body: PackageFields) => {
    const { data } = await http.post<ResponseWithMessage>(`/v1/packaging`, body)

    return data
  },

  updatePackage: async ({ id, body }: { id: number; body: PackageFields }) => {
    const { data } = await http.put<ResponseWithMessage>(
      `/v1/packaging/${id}`,
      body,
    )

    return data
  },

  deletePackage: async (id: number) => {
    const { data } = await http.delete<ResponseWithMessage>(
      `/v1/packaging/${id}`,
    )

    return data
  },
}
