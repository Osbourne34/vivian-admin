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
import { Branch, BranchDetail } from '../types/branch'
import { BranchFields } from '../types/branch-fields'

import { Filters } from '@/shared/api/filters/filters'

import { Sort } from '@/shared/ui/table/types'
import {
  Error,
  ResponseWithData,
  ResponseWithMessage,
  ResponseWithPagination,
} from '@/shared/http/types'

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
  options?: UseQueryOptions<ResponseWithPagination<Branch[]>, Error>
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
  options?: UseQueryOptions<ResponseWithData<BranchDetail>, Error>
) => {
  return useQuery<ResponseWithData<BranchDetail>, Error>(
    ['branch', orientId],
    () => BranchesService.getBranch(orientId),
    {
      staleTime: 20_000,
      ...options,
    }
  )
}

export const useCreateBranch = (
  closeModal: () => void,
  options?: UseMutationOptions<ResponseWithMessage, Error, BranchFields>
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
        push('/login')
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
  >
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
        push('/login')
      }
    },
    ...options,
  })
}

export const useDeleteBranch = (
  options?: UseMutationOptions<ResponseWithMessage, Error, number>
) => {
  const { push } = useRouter()

  return useMutation<ResponseWithMessage, Error, number>({
    mutationFn: BranchesService.deleteBranch,
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

export const useFetchGroupBranches = () => {
  return useQuery({
    queryFn: Filters.getBranchesTree,
    queryKey: ['branchesWithTree'],
    select: (data) => {
      const newData = data.data.map((branch) => {
        const newBranches = branch.childrens.map((childBranch) => {
          return {
            value: String(childBranch.id),
            label: childBranch.name,
          }
        })
        return {
          group: branch.name,
          items: newBranches,
        }
      })

      return {
        status: data.status,
        data: newData,
      }
    },
  })
}

export const useFetchSortedBranches = () => {
  return useQuery({
    queryFn: Filters.getBranches,
    queryKey: ['branchesWithoutTree'],
    select: (data) => {
      const parentsBranches = data.data.filter(
        (branch) => branch.parent_id === 0
      )

      let sortedBranches: {
        id: number
        parent_id: number
        name: string
        parent_name: string | null
      }[] = []

      parentsBranches.forEach((parent) => {
        sortedBranches.push(parent)
        sortedBranches = sortedBranches.concat(
          data.data.filter((branch) => parent.id === branch.parent_id)
        )
      })

      const newData = sortedBranches.map((branch) => ({
        value: String(branch.id),
        label: branch.name,
      }))

      return {
        status: data.status,
        data: newData,
      }
    },
  })
}

export const useFetchParentBranches = () => {
  return useQuery({
    queryFn: Filters.getBranches,
    queryKey: ['parentBranches'],
    select: (data) => {
      return data.data
        .filter(
          (branch) => branch.parent_id === 0 && branch.parent_name === null
        )
        .map((branch) => {
          return {
            value: String(branch.id),
            label: branch.name,
          }
        })
    },
  })
}
