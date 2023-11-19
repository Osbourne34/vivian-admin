import { useRouter } from 'next/router'

import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { modals } from '@mantine/modals'
import { notifications } from '@mantine/notifications'

import { OrientsService } from '../service/orients-service'
import { Orient } from '../types/orient'
import { OrientFields } from '../types/orient-fields'

import { Sort } from '@/shared/ui/table/types'
import {
  Error,
  ResponseWithData,
  ResponseWithMessage,
  ResponseWithPagination,
} from '@/shared/types/http'

export const useFetchOrients = (
  {
    sort,
    page,
    rowsPerPage,
    debouncedSearchValue,
    branch,
  }: {
    sort: Sort
    page: number
    rowsPerPage: string | null
    debouncedSearchValue: string
    branch: string | null
  },
  options?: UseQueryOptions<ResponseWithPagination<Orient[]>, Error>,
) => {
  return useQuery<ResponseWithPagination<Orient[]>, Error>(
    ['orients', sort, page, rowsPerPage, debouncedSearchValue, branch],
    () =>
      OrientsService.getOrients({
        page,
        perpage: rowsPerPage,
        orderby: sort.orderby,
        sort: sort.sort,
        search: debouncedSearchValue,
        branch_id: branch,
      }),
    {
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
    },
  )
}

export const useFetchOrient = (
  orientId: number,
  options?: UseQueryOptions<ResponseWithData<Orient>, Error>,
) => {
  return useQuery<ResponseWithData<Orient>, Error>(
    ['orient', orientId],
    () => OrientsService.getOrient(orientId),
    {
      staleTime: 20_000,
      ...options,
    },
  )
}

export const useCreateOrient = (
  closeModal: () => void,
  options?: UseMutationOptions<ResponseWithMessage, Error, OrientFields>,
) => {
  const { push } = useRouter()
  const queryClient = useQueryClient()

  return useMutation<ResponseWithMessage, Error, OrientFields>({
    mutationFn: OrientsService.createOrient,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['orients'])
      closeModal()
      notifications.show({
        title: 'Успешно',
        message: data.message,
        color: 'green',
      })
    },
    onError: (error) => {
      if (error.status === 401) {
        push('/login')
      }
    },
    ...options,
  })
}

export const useUpdateOrient = (
  orientId: number,
  options?: UseMutationOptions<
    ResponseWithMessage,
    Error,
    { id: number; body: OrientFields }
  >,
) => {
  const { push } = useRouter()
  const queryClient = useQueryClient()

  return useMutation<
    ResponseWithMessage,
    Error,
    { id: number; body: OrientFields }
  >({
    mutationFn: OrientsService.updateOrient,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['orients'])
      queryClient.invalidateQueries(['orient', orientId])
      modals.closeAll()
      notifications.show({
        title: 'Успешно',
        message: data.message,
        color: 'green',
      })
    },
    onError: (error) => {
      if (error.status === 401) {
        push('/login')
      }
    },
    ...options,
  })
}

export const useDeleteOrient = (
  options?: UseMutationOptions<ResponseWithMessage, Error, number>,
) => {
  const { push } = useRouter()

  return useMutation<ResponseWithMessage, Error, number>({
    mutationFn: OrientsService.deleteOrient,
    onError: (error) => {
      if (error?.status === 401) {
        push('/login')
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
