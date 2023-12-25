import { useRouter } from 'next/router'

import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query'
import { notifications } from '@mantine/notifications'

import { MaterialsService } from '../service/materials-service'
import { Material } from '../types/material'
import { MaterialFields } from '../types/material-fields'

import { Sort } from '@/shared/ui/table/types'
import {
  ResponseWithPagination,
  Error,
  ResponseWithData,
  ResponseWithMessage,
} from '@/shared/types/http'
import { Filters } from '@/shared/api/filters/filters'
import { ROUTES } from '@/shared/constants/routes'
import { selectItemsDto } from '@/shared/utils/select-items-dto'

export const useFetchMaterials = (
  {
    page,
    perpage,
    search,
    sort,
    type_id,
  }: {
    page: number
    perpage: string | null
    search: string
    sort: Sort
    type_id: string | null
  },
  options?: UseQueryOptions<ResponseWithPagination<Material[]>, Error>,
) => {
  return useQuery({
    queryKey: ['materials', page, perpage, search, sort, type_id],
    queryFn: () =>
      MaterialsService.getMaterials({
        page,
        perpage,
        search,
        sort: sort.sort,
        orderby: sort.orderby,
        type_id,
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

export const useFetchMaterial = (
  materialId: Material['id'],
  options?: UseQueryOptions<ResponseWithData<Material>, Error>,
) => {
  return useQuery({
    queryKey: ['material', materialId],
    queryFn: () => MaterialsService.getMaterial(materialId),
    staleTime: 20_000,
    ...options,
  })
}

export const useCreateMaterial = (
  options?: UseMutationOptions<ResponseWithMessage, Error, MaterialFields>,
) => {
  const { push } = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: MaterialsService.createMaterial,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['materials'])
      push(ROUTES.MATERIALS)
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

export const useUpdateMaterial = (
  materialId: Material['id'],
  options?: UseMutationOptions<
    ResponseWithMessage,
    Error,
    {
      id: Material['id']
      body: MaterialFields
    }
  >,
) => {
  const { push } = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: MaterialsService.updateMaterial,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['materials'])
      queryClient.invalidateQueries(['material', materialId])
      push(ROUTES.MATERIALS)
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

export const useDeleteMaterial = (
  options?: UseMutationOptions<ResponseWithMessage, Error, number>,
) => {
  const { push } = useRouter()

  return useMutation({
    mutationFn: MaterialsService.deleteMaterial,
    onError: (error) => {
      if (error?.status === 401) {
        push(ROUTES.LOGIN)
      } else {
        notifications.show({
          title: 'Ошибка',
          message: error?.message,
          color: 'red',
        })
      }
    },
    ...options,
  })
}

export const useFetchMaterialUnits = () => {
  return useQuery({
    queryFn: Filters.getMaterialUnits,
    queryKey: ['material-units'],
    select: (data) => {
      return selectItemsDto(data.data, 'value', 'title')
    },
  })
}
