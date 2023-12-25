import { useRouter } from 'next/router'

import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query'
import { notifications } from '@mantine/notifications'

import { PackagesService } from '../service/packages-service'
import { Package, PackageDetail } from '../types/package'
import { PackageFields } from '../types/package-fields'

import {
  ResponseWithData,
  ResponseWithMessage,
  ResponseWithPagination,
  Error,
} from '@/shared/types/http'

import { Sort } from '@/shared/ui/table/types'
import { ROUTES } from '@/shared/constants/routes'

export const useFetchPackages = (
  {
    sort,
    page,
    perpage,
    search,
  }: {
    sort: Sort
    page: number
    search: string
    perpage: string | null
  },
  options?: UseQueryOptions<ResponseWithPagination<Package[]>, Error>,
) => {
  return useQuery({
    queryKey: ['packages', sort, page, perpage, search],
    queryFn: () =>
      PackagesService.getPackages({
        page,
        perpage,
        orderby: sort.orderby,
        sort: sort.sort,
        search,
      }),
    onError: (error) => {
      notifications.show({
        title: 'Ошибка',
        message: error.message,
        color: 'red',
      })
    },
    retry: 0,
    keepPreviousData: true,
    ...options,
  })
}

export const useShowPackage = (
  packageId: number,
  options?: UseQueryOptions<
    ResponseWithData<PackageDetail['materials']>,
    Error
  >,
) => {
  return useQuery({
    queryKey: ['package', packageId, 'show'],
    queryFn: () => PackagesService.showPackage(packageId),
    staleTime: 20_000,
    ...options,
  })
}

export const useFetchPackage = (
  packageId: number,
  options?: UseQueryOptions<ResponseWithData<PackageDetail>, Error>,
) => {
  return useQuery({
    queryKey: ['package', packageId, 'edit'],
    queryFn: () => PackagesService.getPackage(packageId),
    ...options,
  })
}

export const useCreatePackage = (
  options?: UseMutationOptions<ResponseWithMessage, Error, PackageFields>,
) => {
  const { push } = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: PackagesService.createPackage,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['packages'])
      push(ROUTES.PACKAGES)
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

export const useUpdatePackage = (
  packageId: number,
  options?: UseMutationOptions<ResponseWithMessage, Error, {}>,
) => {
  const { push } = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: PackagesService.updatePackage,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['packages'])
      queryClient.invalidateQueries(['package', packageId, 'show'])
      push(ROUTES.PACKAGES)
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

export const useDeletePackage = (
  options?: UseMutationOptions<ResponseWithMessage, Error, number>,
) => {
  const { push } = useRouter()

  return useMutation({
    mutationFn: PackagesService.deletePackage,
    onError: (error) => {
      if (error.status === 401) {
        push(ROUTES.LOGIN)
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
