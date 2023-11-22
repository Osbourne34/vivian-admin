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

import { BranchesService } from '../service/branches-service'
import { parentBranches } from '../utils/parent-branches'
import { Branch, BranchDetail, BranchWithParent } from '../types/branch'
import { BranchFields } from '../types/branch-fields'

import { Filters } from '@/shared/api/filters/filters'
import { selectItemsDto } from '@/shared/utils/select-items-dto'

import { Sort } from '@/shared/ui/table/types'
import {
  Error,
  ResponseWithData,
  ResponseWithMessage,
  ResponseWithPagination,
} from '@/shared/types/http'
import { groupBranches } from '@/features/branches/utils/group-branches'
import { sortBranches } from '@/features/branches/utils/sort-branches'
import { ROUTES } from '@/shared/constants/routes'

export const useFetchBranches = (
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
  options?: UseQueryOptions<ResponseWithPagination<Branch[]>, Error>,
) => {
  return useQuery<ResponseWithPagination<Branch[]>, Error>({
    queryKey: ['branches', sort, page, rowsPerPage, debouncedSearchValue],
    queryFn: () =>
      BranchesService.getBranches({
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

export const useFetchBranch = (
  orientId: number,
  options?: UseQueryOptions<ResponseWithData<BranchDetail>, Error>,
) => {
  return useQuery<ResponseWithData<BranchDetail>, Error>(
    ['branch', orientId],
    () => BranchesService.getBranch(orientId),
    {
      staleTime: 20_000,
      ...options,
    },
  )
}

export const useCreateBranch = (
  closeModal: () => void,
  options?: UseMutationOptions<ResponseWithMessage, Error, BranchFields>,
) => {
  const { push } = useRouter()
  const queryClient = useQueryClient()

  return useMutation<ResponseWithMessage, Error, BranchFields>({
    mutationFn: BranchesService.createBranch,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['branches'])
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

export const useUpdateBranch = (
  branchId: number,
  options?: UseMutationOptions<
    ResponseWithMessage,
    Error,
    { id: number; body: BranchFields }
  >,
) => {
  const { push } = useRouter()
  const queryClient = useQueryClient()

  return useMutation<
    ResponseWithMessage,
    Error,
    { id: number; body: BranchFields }
  >({
    mutationFn: BranchesService.updateBranch,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['branches'])
      queryClient.invalidateQueries(['branch', branchId])
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

export const useDeleteBranch = (
  options?: UseMutationOptions<ResponseWithMessage, Error, number>,
) => {
  const { push } = useRouter()

  return useMutation<ResponseWithMessage, Error, number>({
    mutationFn: BranchesService.deleteBranch,
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

export const useFetchGroupBranches = () => {
  return useQuery({
    queryFn: Filters.getBranchesTree,
    queryKey: ['group-branches'],
    select: (data) => {
      return groupBranches(data.data)
    },
  })
}

export const useFetchSortedBranches = () => {
  return useQuery({
    queryFn: Filters.getBranches,
    queryKey: ['sorted-branches'],
    select: (data) => {
      return sortBranches(data.data)
    },
  })
}

export const useFetchParentBranches = () => {
  return useQuery({
    queryFn: Filters.getBranches,
    queryKey: ['parent-branches'],
    select: (data) => {
      return selectItemsDto(parentBranches(data.data), 'id', 'name')
    },
  })
}
