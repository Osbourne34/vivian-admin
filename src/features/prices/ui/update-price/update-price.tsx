import { useRouter } from 'next/router'

import { Alert, Center, Loader } from '@mantine/core'

import { PriceForm } from '../price-form/price-form'
import { useFetchPrice, useUpdatePrice } from '../../queries/queries'
import { PriceFields } from '../../types/price-fields'

export const UpdatePrice = () => {
  const {
    query: { id },
  } = useRouter()

  const updateMutation = useUpdatePrice(Number(id))

  const handleSubmit = async (data: PriceFields) => {
    try {
      const body = {
        ...data,
        employees: data.employees.map((employee) => employee.id),
      }
      await updateMutation.mutateAsync({
        id: Number(id),
        //@ts-ignore
        body,
      })
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const { data: price, status, error, isFetching } = useFetchPrice(Number(id))

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
