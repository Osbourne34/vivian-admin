import { useRouter } from 'next/router'

import { Alert, Center, Loader } from '@mantine/core'

import { MaterialForm } from '../material-form/material-form'
import { useFetchMaterial, useUpdateMaterial } from '../../queries/queries'
import { MaterialFields } from '../../types/material-fields'

export const UpdateMaterial = () => {
  const {
    query: { id },
  } = useRouter()

  const updateMutation = useUpdateMaterial(Number(id))

  const handleSubmit = async (body: MaterialFields) => {
    try {
      await updateMutation.mutateAsync({
        id: Number(id),
        body,
      })
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const { data, status, error } = useFetchMaterial(Number(id))

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
        <MaterialForm
          initialData={{
            count: String(data?.data.count),
            price: String(data?.data.price),
            name: data?.data.name!,
            unit: data?.data.unit!,
            transport_costs: data?.data.transport_costs
              ? String(data.data.transport_costs)
              : '',
            type_id: String(data?.data.type_id),
          }}
          submit={handleSubmit}
          loading={updateMutation.isLoading}
          error={updateMutation.error?.message || ''}
          titleSubmit={'Сохранить'}
        />
      )}
    </>
  )
}
