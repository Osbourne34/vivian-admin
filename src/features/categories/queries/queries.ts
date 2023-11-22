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

import { CategoriesService } from '../service/categories-service'
import { Category } from '../types/category'
import { CategoryFields } from '../types/category-fields'

import { Sort } from '@/shared/ui/table/types'
import {
  Error,
  ResponseWithData,
  ResponseWithMessage,
  ResponseWithPagination,
} from '@/shared/types/http'
import { ROUTES } from '@/shared/constants/routes'

export const useFetchCategories = (
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
  options?: UseQueryOptions<ResponseWithPagination<Category[]>, Error>,
) => {
  return useQuery<ResponseWithPagination<Category[]>, Error>({
    queryKey: ['categories', sort, page, rowsPerPage, debouncedSearchValue],
    queryFn: () =>
      CategoriesService.getCategories({
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

export const useFetchCategory = (
  categoryId: number,
  options?: UseQueryOptions<ResponseWithData<Category>, Error>,
) => {
  return useQuery<ResponseWithData<Category>, Error>(
    ['category', categoryId],
    () => CategoriesService.getCategory(categoryId),
    {
      staleTime: 20_000,
      ...options,
    },
  )
}

export const useCreateCategory = (
  closeModal: () => void,
  options?: UseMutationOptions<ResponseWithMessage, Error, CategoryFields>,
) => {
  const { push } = useRouter()
  const queryClient = useQueryClient()

  return useMutation<ResponseWithMessage, Error, CategoryFields>({
    mutationFn: CategoriesService.createCategory,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['categories'])
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

export const useUpdateCategory = (
  categoryId: number,
  options?: UseMutationOptions<
    ResponseWithMessage,
    Error,
    { id: number; body: CategoryFields }
  >,
) => {
  const { push } = useRouter()
  const queryClient = useQueryClient()

  return useMutation<
    ResponseWithMessage,
    Error,
    { id: number; body: CategoryFields }
  >({
    mutationFn: CategoriesService.updateCategory,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['categories'])
      queryClient.invalidateQueries(['category', categoryId])
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

export const useDeleteCategory = (
  options?: UseMutationOptions<ResponseWithMessage, Error, number>,
) => {
  const { push } = useRouter()

  return useMutation<ResponseWithMessage, Error, number>({
    mutationFn: CategoriesService.deleteCategoty,
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
