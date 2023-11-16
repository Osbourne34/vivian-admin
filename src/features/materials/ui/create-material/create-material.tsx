import { MaterialForm } from '../material-form/material-form'
import { useCreateMaterial } from '../../queries/queries'
import { MaterialFields } from '../../types/material-fields'

export const CreateMaterial = () => {
  const createMutation = useCreateMaterial()
  const handleSubmit = async (data: MaterialFields) => {
    try {
      await createMutation.mutateAsync(data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return (
    <MaterialForm
      submit={handleSubmit}
      error={createMutation.error?.message || ''}
      loading={createMutation.isLoading}
      titleSubmit={'Создать'}
    />
  )
}
