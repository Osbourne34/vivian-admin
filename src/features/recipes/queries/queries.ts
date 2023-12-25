import { useRouter } from 'next/router'

import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query'
import { notifications } from '@mantine/notifications'

import { RecipesService } from '../service/recipes-service'
import { Recipe, RecipeDetail } from '../types/recipe'
import { RecipeFields } from '../types/recipe-fields'

import {
  ResponseWithData,
  ResponseWithMessage,
  ResponseWithPagination,
  Error,
} from '@/shared/types/http'

import { Sort } from '@/shared/ui/table/types'
import { ROUTES } from '@/shared/constants/routes'
import { Filters } from '@/shared/api/filters/filters'
import { selectItemsDto } from '@/shared/utils/select-items-dto'

export const useFetchRecipes = (
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
  options?: UseQueryOptions<ResponseWithPagination<Recipe[]>, Error>,
) => {
  return useQuery({
    queryKey: ['recipes', sort, page, perpage, search],
    queryFn: () =>
      RecipesService.getRecipes({
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

export const useShowRecipe = (
  recipeId: number,
  options?: UseQueryOptions<ResponseWithData<RecipeDetail['materials']>, Error>,
) => {
  return useQuery({
    queryKey: ['recipe', recipeId, 'show'],
    queryFn: () => RecipesService.showRecipe(recipeId),
    staleTime: 20_000,
    ...options,
  })
}

export const useFetchRecipe = (
  recipeId: number,
  options?: UseQueryOptions<ResponseWithData<RecipeDetail>, Error>,
) => {
  return useQuery({
    queryKey: ['recipe', recipeId, 'edit'],
    queryFn: () => RecipesService.getRecipe(recipeId),
    ...options,
  })
}

export const useFetchRecipeUnits = () => {
  return useQuery({
    queryKey: ['recipe-units'],
    queryFn: Filters.getRecipeUnits,
    select: (data) => {
      return selectItemsDto(data.data, 'value', 'title')
    },
  })
}

export const useCreateRecipe = (
  options?: UseMutationOptions<ResponseWithMessage, Error, RecipeFields>,
) => {
  const { push } = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: RecipesService.createRecipe,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['recipes'])
      push(ROUTES.RECIPES)
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

export const useUpdateRecipe = (
  recipeId: number,
  options?: UseMutationOptions<ResponseWithMessage, Error, {}>,
) => {
  const { push } = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: RecipesService.updateRecipe,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['recipes'])
      queryClient.invalidateQueries(['recipe', recipeId, 'show'])
      push(ROUTES.RECIPES)
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

export const useDeleteRecipe = (
  options?: UseMutationOptions<ResponseWithMessage, Error, number>,
) => {
  const { push } = useRouter()

  return useMutation({
    mutationFn: RecipesService.deleteRecipe,
    onError: (error) => {
      if (error?.status === 401) {
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
