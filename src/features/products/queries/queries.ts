import { Sort } from '@/shared/ui/table/types'
import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { ProductsService } from '../service/products-service'
import { notifications } from '@mantine/notifications'
import {
  Error,
  ResponseWithData,
  ResponseWithMessage,
  ResponseWithPagination,
} from '@/shared/http/types'
import { Product, ProductDetail } from '../types/product'
import { useRouter } from 'next/router'

export const useFetchProducts = (
  {
    category_id,
    debouncedSearchValue,
    page,
    rowsPerPage,
    sort,
  }: {
    sort: Sort
    page: number
    rowsPerPage: string | null
    debouncedSearchValue: string
    category_id: string | null
  },
  options?: UseQueryOptions<ResponseWithPagination<Product[]>, Error>,
) => {
  return useQuery<ResponseWithPagination<Product[]>, Error>(
    ['products', category_id, debouncedSearchValue, page, rowsPerPage, sort],
    () =>
      ProductsService.getProducts({
        page,
        perpage: rowsPerPage,
        orderby: sort.orderby,
        sort: sort.sort,
        search: debouncedSearchValue,
        category_id,
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

export const useFetchProduct = (
  productId: number,
  options?: UseQueryOptions<ResponseWithData<ProductDetail>, Error>,
) => {
  return useQuery<ResponseWithData<ProductDetail>, Error>(
    ['product', productId],
    () => ProductsService.getProduct(productId),
    {
      staleTime: 20_000,
      ...options,
    },
  )
}

export const useCreateProduct = (
  options?: UseMutationOptions<ResponseWithMessage, Error, FormData>,
) => {
  const { push } = useRouter()
  const queryClient = useQueryClient()

  return useMutation<ResponseWithMessage, Error, FormData>({
    mutationFn: ProductsService.createProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['products'])
      push('/products')
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

export const useUpdateProduct = (
  productId: number,
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
    mutationFn: ProductsService.updateProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['products'])
      queryClient.invalidateQueries(['product', productId])
      push('/products')
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

export const useDeleteProduct = (
  options?: UseMutationOptions<ResponseWithMessage, Error, number>,
) => {
  const { push } = useRouter()

  return useMutation<ResponseWithMessage, Error, number>({
    mutationFn: ProductsService.deleteProduct,
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
