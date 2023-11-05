import { useRouter } from 'next/router'

import { Alert, Center, Loader } from '@mantine/core'
import { nanoid } from 'nanoid'

import { ComboForm } from '../combo-form/combo-form'
import { useFetchCombo, useUpdateCombo } from '../../queries/queries'
import { ComboFields } from '../../types/combo-fields'

export const UpdateCombo = () => {
  const { query } = useRouter()

  const updateMutation = useUpdateCombo(Number(query.id))

  const handleSubmit = async (body: ComboFields) => {
    try {
      await updateMutation.mutateAsync({
        id: Number(query.id),
        body,
      })
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const { data, status, error } = useFetchCombo(Number(query.id))

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
        <ComboForm
          error={updateMutation.error?.message || ''}
          isLoading={updateMutation.isLoading}
          submit={handleSubmit}
          submitTitle="Сохранить"
          initialData={{
            name: data?.data.name!,
            price: String(data?.data.price!),
            point: String(data?.data.point!),
            combos: data!.data.combos.map((combo) => {
              return {
                id: nanoid(),
                limit: String(combo.limit),
                products: combo.products,
              }
            }),
          }}
        />
      )}
    </>
  )
}
