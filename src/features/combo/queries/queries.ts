import { useRouter } from 'next/router'

import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { notifications } from '@mantine/notifications'

import { ComboService } from '../service/combo-service'
import { Combo, ComboDetail } from '../types/combo'
import { ComboFields } from '../types/combo-fields'

import {
  Error,
  ResponseWithData,
  ResponseWithMessage,
  ResponseWithPagination,
} from '@/shared/http/types'
import { Sort } from '@/shared/ui/table/types'

export const useFetchCombos = (
  {
    sort,
    page,
    rowsPerPage,
    debouncedSearchValue,
  }: {
    sort: Sort
    page: number
    rowsPerPage: string | null
    debouncedSearchValue: string
  },
  options?: UseQueryOptions<ResponseWithPagination<Combo[]>, Error>,
) => {
  return useQuery<ResponseWithPagination<Combo[]>, Error>({
    queryKey: ['combos', sort, page, rowsPerPage, debouncedSearchValue],
    queryFn: () =>
      ComboService.getCombos({
        page,
        perpage: rowsPerPage,
        orderby: sort.orderby,
        sort: sort.sort,
        search: debouncedSearchValue,
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

export const useFetchCombo = (
  comboId: number,
  options?: UseQueryOptions<ResponseWithData<ComboDetail>, Error>,
) => {
  return useQuery<ResponseWithData<ComboDetail>, Error>(
    ['combo', comboId],
    () => ComboService.getCombo(comboId),
    {
      staleTime: 20_000,
      ...options,
    },
  )
}

export const useCreateCombo = (
  options?: UseMutationOptions<ResponseWithMessage, Error, ComboFields>,
) => {
  const { push } = useRouter()
  const queryClient = useQueryClient()

  return useMutation<ResponseWithMessage, Error, ComboFields>({
    mutationFn: ComboService.createCombo,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['combos'])
      push('/combo')
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

export const useUpdateCombo = (
  comboId: number,
  options?: UseMutationOptions<
    ResponseWithMessage,
    Error,
    { id: number; body: ComboFields }
  >,
) => {
  const { push } = useRouter()
  const queryClient = useQueryClient()

  return useMutation<
    ResponseWithMessage,
    Error,
    { id: number; body: ComboFields }
  >({
    mutationFn: ComboService.updateCombo,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['combos'])
      queryClient.invalidateQueries(['combo', comboId])
      push('/combo')
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

export const useDeleteCombo = (
  options?: UseMutationOptions<ResponseWithMessage, Error, number>,
) => {
  const { push } = useRouter()

  return useMutation<ResponseWithMessage, Error, number>({
    mutationFn: ComboService.deleteCombo,
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
