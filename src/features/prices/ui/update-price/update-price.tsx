import { useRouter } from 'next/router'
import { useFetchPrice, useUpdatePrice } from '../../queries/queries'
import { PriceForm } from '../price-form/price-form'
import { Alert, Center, Loader } from '@mantine/core'
import { PriceFields } from '../../types/price-fields'

export const UpdatePrice = () => {
  const { query } = useRouter()

  const updateMutation = useUpdatePrice(Number(query.id))

  const handleSubmit = async (body: PriceFields) => {
    try {
      await updateMutation.mutateAsync({
        id: Number(query.id),
        body,
      })
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const { data: price, status, error } = useFetchPrice(Number(query.id))

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
        <PriceForm
          error={updateMutation.error?.message || ''}
          loading={updateMutation.isLoading}
          submit={handleSubmit}
          submitTitle="Сохранить"
          initialData={{
            active: price?.data.active!,
            employees: price?.data.employees!,
            name: price?.data.name!,
            products: price?.data.products!,
          }}
        />
      )}
    </>
  )
}