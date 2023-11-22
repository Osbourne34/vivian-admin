import { useRouter } from 'next/router'

import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query'
import { modals } from '@mantine/modals'
import { notifications } from '@mantine/notifications'
import { ComboboxItem } from '@mantine/core'

import { MaterialTypesService } from '../service/material-types-service'
import { MaterialType } from '../types/material-type'
import { MaterialTypeFields } from '../types/material-type-fields'

import { Filters } from '@/shared/api/filters/filters'

import {
  ResponseWithData,
  ResponseWithMessage,
  ResponseWithPagination,
  Error,
} from '@/shared/types/http'
import { Sort } from '@/shared/ui/table/types'
import { selectItemsDto } from '@/shared/utils/select-items-dto'
import {ROUTES} from "@/shared/constants/routes";

export const useFetchMaterialTypes = (
  {
    sort,
    page,
    rowsPerPage,
    search,
  }: {
    sort: Sort
    page: number
    rowsPerPage: string | null
    search: string
  },
  options?: UseQueryOptions<ResponseWithPagination<MaterialType[]>, Error>,
) => {
  return useQuery({
    queryKey: ['material-types', sort, page, rowsPerPage, search],
    queryFn: () =>
      MaterialTypesService.getMaterialTypes({
        page,
        perpage: rowsPerPage,
        orderby: sort.orderby,
        sort: sort.sort,
        search,
      }),
    onError: (error) => {
      notifications.show({
        title: 'Ошибка',
        message: error?.message,
        color: 'red',
      })
    },
    retry: 0,
    keepPreviousData: true,
    ...options,
  })
}

export const useFetchMaterialTypesForSelect = (
  options?: UseQueryOptions<
    ResponseWithData<{ id: number; name: string }[]>,
    Error,
    ComboboxItem[]
  >,
) => {
  return useQuery({
    queryFn: Filters.getMaterialTypes,
    queryKey: ['material-types-for-select'],
    select: (data) => {
      return selectItemsDto(data.data, 'id', 'name')
    },
    ...options,
  })
}

export const useFetchMaterialType = (
  materialTypeId: MaterialType['id'],
  options?: UseQueryOptions<ResponseWithData<MaterialType>, Error>,
) => {
  return useQuery({
    queryKey: ['material-type', materialTypeId],
    queryFn: () => MaterialTypesService.getMaterialType(materialTypeId),
    staleTime: 20_000,
    ...options,
  })
}

export const useCreateMaterialType = (
  closeModal: () => void,
  options?: UseMutationOptions<ResponseWithMessage, Error, MaterialTypeFields>,
) => {
  const { push } = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: MaterialTypesService.createMaterialType,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['material-types'])
      closeModal()
      notifications.show({
        title: 'Успешно',
        message: data.message,
        color: 'green',
      })
    },
    onError: (error) => {
      if (error.status === 401) {
        push(ROUTES.LOGIN)
      }
    },
    ...options,
  })
}

export const useUpdateMaterialType = (
  materialTypeId: MaterialType['id'],
  options?: UseMutationOptions<
    ResponseWithMessage,
    Error,
    { id: MaterialType['id']; body: MaterialTypeFields }
  >,
) => {
  const { push } = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: MaterialTypesService.updateMaterialType,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['material-types'])
      queryClient.invalidateQueries(['material-type', materialTypeId])
      modals.closeAll()
      notifications.show({
        title: 'Успешно',
        message: data.message,
        color: 'green',
      })
    },
    onError: (error) => {
      if (error.status === 401) {
        push(ROUTES.LOGIN)
      }
    },
    ...options,
  })
}

export const useDeleteMaterialType = (
  options?: UseMutationOptions<ResponseWithMessage, Error, number>,
) => {
  const { push } = useRouter()

  return useMutation({
    mutationFn: MaterialTypesService.deleteMaterialType,
    onError: (error) => {
      if (error?.status === 401) {
        push(ROUTES.LOGIN)
      } else {
        notifications.show({
          title: 'Ошибка',
          message: error.message,
          color: 'red',
        })
      }
    },
    ...options,
  })
}
