import { PriceForm } from '../price-form/price-form'
import { useCreatePrice } from '../../queries/queries'
import { PriceFields } from '../../types/price-fields'

export const CreatePrice = () => {
  const createMutation = useCreatePrice()

  const handleSubmit = async (data: PriceFields) => {
    try {
      const body = {
        ...data,
        employees: data.employees.map((employee) => employee.id),
      }
      //@ts-ignore
      await createMutation.mutateAsync(body)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return (
    <PriceForm
      error={createMutation.error?.message || ''}
      loading={createMutation.isLoading}
      submit={handleSubmit}
      submitTitle="Создать"
    />
  )
}
