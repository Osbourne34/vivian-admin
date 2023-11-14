import {
  Error,
  ResponseWithData,
  ResponseWithMessage,
  ResponseWithPagination,
} from '@/shared/http/types'
import { Sort } from '@/shared/ui/table/types'
import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import {
  IndividualPrice,
  IndividualPriceEdit,
  IndividualPriceShow,
} from '../types/individual-price'
import { PricesService } from '../service/prices-service'
import { notifications } from '@mantine/notifications'
import { useRouter } from 'next/router'
import { PriceFields } from '../types/price-fields'

export const useFetchPrices = (
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
  options?: UseQueryOptions<ResponseWithPagination<IndividualPrice[]>, Error>,
) => {
  return useQuery<ResponseWithPagination<IndividualPrice[]>, Error>(
    ['individual-prices', sort, page, rowsPerPage, debouncedSearchValue],
    () =>
      PricesService.getPrices({
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

export const useShowPrice = (
  priceId: number,
  options?: UseQueryOptions<ResponseWithData<IndividualPriceShow>, Error>,
) => {
  return useQuery<ResponseWithData<IndividualPriceShow>, Error>(
    ['individual-price', priceId, 'show'],
    () => PricesService.showPrice(priceId),
    {
      staleTime: 20_000,
      ...options,
    },
  )
}

export const useFetchPrice = (
  priceId: number,
  options?: UseQueryOptions<ResponseWithData<IndividualPriceEdit>, Error>,
) => {
  return useQuery<ResponseWithData<IndividualPriceEdit>, Error>(
    ['individual-price', priceId, 'edit'],
    () => PricesService.getPrice(priceId),
    {
      ...options,
    },
  )
}

export const useCreatePrice = (
  options?: UseMutationOptions<ResponseWithMessage, Error, PriceFields>,
) => {
  const { push } = useRouter()
  const queryClient = useQueryClient()

  return useMutation<ResponseWithMessage, Error, PriceFields>({
    mutationFn: PricesService.createPrice,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['individual-prices'])
      push('/prices')
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

export const useUpdatePrice = (
  priceId: number,
  options?: UseMutationOptions<
    ResponseWithMessage,
    Error,
    { id: number; body: PriceFields }
  >,
) => {
  const { push } = useRouter()
  const queryClient = useQueryClient()

  return useMutation<
    ResponseWithMessage,
    Error,
    { id: number; body: PriceFields }
  >({
    mutationFn: PricesService.updatePrice,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['individual-prices'])
      queryClient.invalidateQueries(['individual-price', priceId, 'show'])
      push('/prices')
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

export const useDeletePrice = (
  options?: UseMutationOptions<ResponseWithMessage, Error, number>,
) => {
  const { push } = useRouter()

  return useMutation<ResponseWithMessage, Error, number>({
    mutationFn: PricesService.deletePrice,
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
