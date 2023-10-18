import { notifications } from '@mantine/notifications'
import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import { ClientsService } from '../service/client-service'
import { Client, ClientDetail } from '../types/client'

import { Sort } from '@/shared/ui/table/types'
import {
  Error,
  ResponseWithData,
  ResponseWithMessage,
  ResponseWithPagination,
} from '@/shared/http/types'
import { useRouter } from 'next/router'

export const useFetchClients = (
  {
    sort,
    page,
    rowsPerPage,
    debouncedSearchValue,
    branch,
    verify,
    status,
    manager,
  }: {
    sort: Sort
    page: number
    rowsPerPage: string | null
    debouncedSearchValue: string
    branch: string | null
    verify: string | null
    status: string | null
    manager: string | null
  },
  options?: UseQueryOptions<ResponseWithPagination<Client[]>, Error>,
) => {
  return useQuery<ResponseWithPagination<Client[]>, Error>({
    queryKey: [
      'clients',
      sort,
      page,
      rowsPerPage,
      debouncedSearchValue,
      branch,
      manager,
      verify,
      status,
    ],
    queryFn: () =>
      ClientsService.getClients({
        branch_id: branch,
        orderby: sort.orderby,
        sort: sort.sort,
        page: page,
        perpage: rowsPerPage,
        search: debouncedSearchValue,
        manager_id: manager,
        sortbyactivity: status,
        sortbyverified: verify,
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

export const useFetchClient = (
  clientId: number,
  options?: UseQueryOptions<ResponseWithData<ClientDetail>, Error>,
) => {
  return useQuery<ResponseWithData<ClientDetail>, Error>(
    ['client', clientId],
    () => ClientsService.getClient(clientId),
    {
      staleTime: 20_000,
      ...options,
    },
  )
}

export const useCreateClient = (
  options?: UseMutationOptions<ResponseWithMessage, Error, FormData>,
) => {
  const { push } = useRouter()
  const queryClient = useQueryClient()

  return useMutation<ResponseWithMessage, Error, FormData>({
    mutationFn: ClientsService.createClient,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['clients'])
      push('/clients')
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

export const useUpdateClient = (
  clientId: number,
  options?: UseMutationOptions<
    ResponseWithMessage,
    Error,
    { id: number; body: FormData }
  >,
) => {
  const { push } = useRouter()
  const queryClient = useQueryClient()

  return useMutation<
    ResponseWithMessage,
    Error,
    { id: number; body: FormData }
  >({
    mutationFn: ClientsService.updateClient,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['clients'])
      queryClient.invalidateQueries(['client', clientId])
      push('/clients')
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

export const useDeleteClient = (
  options?: UseMutationOptions<ResponseWithMessage, Error, number>,
) => {
  const { push } = useRouter()

  return useMutation<ResponseWithMessage, Error, number>({
    mutationFn: ClientsService.deleteClient,
    onError: (error) => {
      if (error?.status === 401) {
        push('/login')
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
