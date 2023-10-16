import { useRouter } from 'next/router'

import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { notifications } from '@mantine/notifications'

import { EmployeesService } from '../service/employees-service'
import { Employee, EmployeeDetail } from '../types/employee'

import { Sort } from '@/shared/ui/table/types'
import {
  Error,
  ResponseWithData,
  ResponseWithMessage,
  ResponseWithPagination,
} from '@/shared/http/types'

export const useFetchEmployees = (
  {
    sort,
    page,
    rowsPerPage,
    debouncedSearchValue,
    branch,
    verify,
    status,
    role,
  }: {
    sort: Sort
    page: number
    rowsPerPage: string | null
    debouncedSearchValue: string
    branch: string | null
    verify: string | null
    status: string | null
    role: string | null
  },
  options?: UseQueryOptions<ResponseWithPagination<Employee[]>, Error>
) => {
  return useQuery<ResponseWithPagination<Employee[]>, Error>(
    [
      'employees',
      sort,
      page,
      rowsPerPage,
      debouncedSearchValue,
      branch,
      verify,
      status,
      role,
    ],
    () =>
      EmployeesService.getEmployees({
        page,
        perpage: rowsPerPage,
        orderby: sort.orderby,
        sort: sort.sort,
        search: debouncedSearchValue,
        branch_id: branch,
        sortbyactivity: status,
        sortbyverified: verify,
        role,
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
    }
  )
}

export const useFetchEmployee = (
  employeeId: number,
  options?: UseQueryOptions<ResponseWithData<EmployeeDetail>, Error>
) => {
  return useQuery<ResponseWithData<EmployeeDetail>, Error>(
    ['employee', employeeId],
    () => EmployeesService.getEmployee(employeeId),
    {
      staleTime: 20_000,
      ...options,
    }
  )
}

export const useCreateEmployee = (
  options?: UseMutationOptions<ResponseWithMessage, Error, FormData>
) => {
  const { push } = useRouter()
  const queryClient = useQueryClient()

  return useMutation<ResponseWithMessage, Error, FormData>({
    mutationFn: EmployeesService.createEmployee,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['employees'])
      push('/employees')
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

export const useUpdateEmployee = (
  employeeId: number,
  options?: UseMutationOptions<
    ResponseWithMessage,
    Error,
    { id: number; body: FormData }
  >
) => {
  const { push } = useRouter()
  const queryClient = useQueryClient()

  return useMutation<
    ResponseWithMessage,
    Error,
    { id: number; body: FormData }
  >({
    mutationFn: EmployeesService.updateEmployee,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['employees'])
      queryClient.invalidateQueries(['employee', employeeId])
      push('/employees')
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

export const useDeleteEmployee = (
  options?: UseMutationOptions<ResponseWithMessage, Error, number>
) => {
  const { push } = useRouter()

  return useMutation<ResponseWithMessage, Error, number>({
    mutationFn: EmployeesService.deleteEmployee,
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
