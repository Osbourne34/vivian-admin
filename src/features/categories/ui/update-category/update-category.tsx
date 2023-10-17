import { Alert, Center, Loader } from '@mantine/core'
import { modals } from '@mantine/modals'

import { CategoryForm } from '../category-form/category-form'
import { useFetchCategory, useUpdateCategory } from '../../queries/queries'
import { CategoryFields } from '../../types/category-fields'

interface UpdateCategoryProps {
  categoryId: number
}

export const UpdateCategory = (props: UpdateCategoryProps) => {
  const { categoryId } = props

  const updateMutation = useUpdateCategory(categoryId)

  const handleSubmit = async (data: CategoryFields) => {
    try {
      await updateMutation.mutateAsync({ id: categoryId, body: data })
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const { data, status, error } = useFetchCategory(categoryId)

  const isLoading = status === 'loading'
  const isError = status === 'error'
  const isSuccess = status === 'success'

  return (
    <>
      {isLoading && (
        <Center>
          <Loader />
        </Center>
      )}
      {isError && (
        <Alert title="Ошибка" color="red" variant="filled">
          {error?.message}
        </Alert>
      )}
      {isSuccess && (
        <CategoryForm
          initialData={{
            name: data?.data.name!,
          }}
          submit={handleSubmit}
          isLoading={updateMutation.isLoading}
          error={updateMutation.error?.message || ''}
          onCancel={() => modals.closeAll()}
          submitTitle="Сохранить"
        />
      )}
    </>
  )
}
