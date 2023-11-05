import { ComboForm } from '../combo-form/combo-form'
import { useCreateCombo } from '../../queries/queries'
import { ComboFields } from '../../types/combo-fields'

export const CreateCombo = () => {
  const createMutation = useCreateCombo()

  const handleSubmit = async (data: ComboFields) => {
    try {
      await createMutation.mutateAsync(data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return (
    <ComboForm
      submit={handleSubmit}
      isLoading={createMutation.isLoading}
      error={createMutation.error?.message || ''}
      submitTitle="Создать"
    />
  )
}
