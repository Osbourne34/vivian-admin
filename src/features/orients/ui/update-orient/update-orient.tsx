import { Alert, Center, Loader } from '@mantine/core'
import { modals } from '@mantine/modals'

import { OrientForm } from '../orient-form/orient-form'
import { useFetchOrient, useUpdateOrient } from '../../queries/queries'
import { OrientFields } from '../../types/orient-fields'

interface UpdateOrientProps {
  orientId: number
}

export const UpdateOrient = (props: UpdateOrientProps) => {
  const { orientId } = props

  const updateMutation = useUpdateOrient(orientId)

  const handleSubmit = async (data: OrientFields) => {
    try {
      await updateMutation.mutateAsync({ id: orientId, body: data })
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const { data, status, error } = useFetchOrient(orientId)

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
        <OrientForm
          initialData={{
            name: data?.data.name!,
            branch_id: String(data?.data.branch_id),
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
