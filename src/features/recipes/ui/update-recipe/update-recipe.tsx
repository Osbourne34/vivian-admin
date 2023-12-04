import { useRouter } from 'next/router'

import { Alert, Center, Loader } from '@mantine/core'

import { RecipeForm } from '../recipe-form/recipe-form'
import { useFetchRecipe, useUpdateRecipe } from '../../queries/queries'
import { RecipeFields } from '../../types/recipe-fields'

export const UpdateRecipe = () => {
  const {
    query: { id },
  } = useRouter()

  const updateMutation = useUpdateRecipe(Number(id))

  const handleSubmit = async (body: RecipeFields) => {
    try {
      await updateMutation.mutateAsync({
        id: Number(id),
        body,
      })
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const { data: recipe, status, error, isFetching } = useFetchRecipe(Number(id))

  const isError = status === 'error'
  const isSuccess = status === 'success'

  return (
    <>
      {isFetching && (
        <Center>
          <Loader />
        </Center>
      )}

      {isError && (
        <Alert title="Ошибка" color="red" variant="filled">
          {error?.message}
        </Alert>
      )}

      {isSuccess && !isFetching && (
        <RecipeForm
          submit={handleSubmit}
          loading={updateMutation.isLoading}
          error={updateMutation.error?.message || ''}
          submitTitle={'Сохранить'}
          initialData={{
            ...recipe!.data,
            count: String(recipe!.data.count),
          }}
        />
      )}
    </>
  )
}
