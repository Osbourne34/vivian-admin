import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query'
import { SemiFinishedsService } from '../service/semi-finisheds-service'
import { Sort } from '@/shared/ui/table/types'
import { notifications } from '@mantine/notifications'
import {
  ResponseWithPagination,
  Error,
  ResponseWithData,
  ResponseWithMessage,
} from '@/shared/types/http'
import {
  SemiFinished,
  SemiFinishedMaterial,
  SemiFinishedWithDescription,
} from '@/features/semi-finisheds/types/semi-finished'
import { useRouter } from 'next/router'
import { ROUTES } from '@/shared/constants/routes'
import { CreateSemiFinishedFields } from '@/features/semi-finisheds/types/create-semi-finished-fields'
import { UpdateSemiFinishedFields } from '@/features/semi-finisheds/types/update-semi-finished-fields'
import { selectItemsDto } from '@/shared/utils/select-items-dto'

export const useFetchSemiFinisheds = (
  {
    page,
    perpage,
    status,
    sort,
    recipe_id,
    search,
  }: {
    page: number
    perpage: string | null
    search: string
    sort: Sort
    recipe_id: string | null
    status: string | null
  },
  options?: UseQueryOptions<ResponseWithPagination<SemiFinished[]>, Error>,
) => {
  return useQuery({
    queryKey: ['semiFinisheds', page, perpage, status, sort, recipe_id, search],
    queryFn: () =>
      SemiFinishedsService.getSemiFinisheds({
        page,
        perpage,
        search,
        sort: sort.sort,
        orderby: sort.orderby,
        status,
        recipe_id,
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

export const useShowSemiFinished = (
  semiFinishedId: number,
  options?: UseQueryOptions<ResponseWithData<SemiFinishedMaterial[]>, Error>,
) => {
  return useQuery({
    queryKey: ['semiFinished', semiFinishedId, 'show'],
    queryFn: () => SemiFinishedsService.showSemiFinished(semiFinishedId),
    staleTime: 20_000,
    ...options,
  })
}

export const useFetchSemiFinished = (
  semiFinishedId: number,
  options?: UseQueryOptions<
    ResponseWithData<SemiFinishedWithDescription>,
    Error
  >,
) => {
  return useQuery({
    queryKey: ['semiFinished', semiFinishedId, 'edit'],
    queryFn: () => SemiFinishedsService.getSemiFinished(semiFinishedId),
    ...options,
  })
}

export const useCreateSemiFinished = (
  options?: UseMutationOptions<
    ResponseWithMessage,
    Error,
    CreateSemiFinishedFields
  >,
) => {
  const { push } = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: SemiFinishedsService.createSemiFinished,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['semiFinisheds'])
      push(ROUTES.SEMIFINISHEDS)
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

export const useUpdateSemiFinished = (
  semiFinishedId: number,
  options?: UseMutationOptions<
    ResponseWithMessage,
    Error,
    { semiFinishedId: number; body: UpdateSemiFinishedFields }
  >,
) => {
  const { push } = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: SemiFinishedsService.updateSemiFinished,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['semiFinisheds'])
      queryClient.invalidateQueries(['semiFinished', semiFinishedId, 'show'])
      push(ROUTES.SEMIFINISHEDS)
      notifications.show({
        title: ' Успешно',
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

export const useDeleteSemiFinished = (
  options?: UseMutationOptions<ResponseWithMessage, Error, number>,
) => {
  const { push } = useRouter()

  return useMutation({
    mutationFn: SemiFinishedsService.deleteSemiFinished,
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

export const useFetchSemiFinishedStatuses = () => {
  return useQuery({
    queryKey: ['semiFinishedStatutes'],
    queryFn: SemiFinishedsService.getSemiFinishedStatuses,
    select: (data) => {
      return selectItemsDto(data.data, 'value', 'title')
    },
    staleTime: 20_000,
  })
}
