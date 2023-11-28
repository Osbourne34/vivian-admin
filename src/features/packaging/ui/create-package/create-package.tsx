import { PackageForm } from '../package-form/package-form'
import { useCreatePackage } from '../../queries/queries'
import { PackageFields } from '../../types/package-fields'

export const CreatePackage = () => {
  const createMutation = useCreatePackage()

  const handleSubmit = async (data: PackageFields) => {
    try {
      await createMutation.mutateAsync(data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return (
    <PackageForm
      submit={handleSubmit}
      submitTitle={'Создать'}
      loading={createMutation.isLoading}
      error={createMutation.error?.message || ''}
    />
  )
}
