import { Alert, Center, Loader } from '@mantine/core'
import { modals } from '@mantine/modals'

import { MaterialTypeForm } from '@/features/material-types/ui/material-type-form/material-type-form'
import {
  useFetchMaterialType,
  useUpdateMaterialType,
} from '../../queries/queries'
import { MaterialTypeFields } from '../../types/material-type-fields'

interface UpdateMaterialTypeProps {
  materialTypeId: number
}

export const UpdateMaterialType = (props: UpdateMaterialTypeProps) => {
  const { materialTypeId } = props

  const updateMutation = useUpdateMaterialType(materialTypeId)

  const handleSubmit = async (data: MaterialTypeFields) => {
    try {
      await updateMutation.mutateAsync({ id: materialTypeId, body: data })
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const { data, status, error } = useFetchMaterialType(materialTypeId)

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
        <MaterialTypeForm
          initialData={{
            name: data?.data.name!,
          }}
          submit={handleSubmit}
          isLoading={updateMutation.isLoading}
          error={updateMutation.error?.message || ''}
          onCancel={() => modals.closeAll()}
          submitTitle={'Сохранить'}
        />
      )}
    </>
  )
}
