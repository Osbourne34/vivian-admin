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

import { RolesService } from '../service/roles-service'
import { Role } from '../types/role'
import { RoleFields } from '../types/role-fields'

import { Sort } from '@/shared/ui/table/types'
import {
  Error,
  ResponseWithData,
  ResponseWithMessage,
  ResponseWithPagination,
} from '@/shared/types/http'

export const useFetchRoles = (
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
  options?: UseQueryOptions<ResponseWithPagination<Role[]>, Error>,
) => {
  return useQuery<ResponseWithPagination<Role[]>, Error>(
    ['roles', sort, page, rowsPerPage, debouncedSearchValue],
    () =>
      RolesService.getRoles({
        page,
        perpage: rowsPerPage,
        orderby: sort.orderby,
        sort: sort.sort,
        search: debouncedSearchValue,
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

export const useFetchRole = (
  roleId: number,
  options?: UseQueryOptions<ResponseWithData<Role>, Error>,
) => {
  return useQuery<ResponseWithData<Role>, Error>(
    ['role', roleId],
    () => RolesService.getRole(roleId),
    {
      staleTime: 20_000,
      ...options,
    },
  )
}

export const useCreateRole = (
  closeModal: () => void,
  options?: UseMutationOptions<ResponseWithMessage, Error, RoleFields>,
) => {
  const { push } = useRouter()
  const queryClient = useQueryClient()

  return useMutation<ResponseWithMessage, Error, RoleFields>({
    mutationFn: RolesService.createRole,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['roles'])
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

export const useUpdateRole = (
  roleId: number,
  options?: UseMutationOptions<
    ResponseWithMessage,
    Error,
    { id: number; body: RoleFields }
  >,
) => {
  const { push } = useRouter()
  const queryClient = useQueryClient()

  return useMutation<
    ResponseWithMessage,
    Error,
    { id: number; body: RoleFields }
  >({
    mutationFn: RolesService.updateRole,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['roles'])
      queryClient.invalidateQueries(['role', roleId])
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

export const useDeleteRole = (
  options?: UseMutationOptions<ResponseWithMessage, Error, number>,
) => {
  const { push } = useRouter()

  return useMutation<ResponseWithMessage, Error, number>({
    mutationFn: RolesService.deleteRole,
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
