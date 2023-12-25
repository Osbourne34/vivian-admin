import { useRouter } from 'next/router'

import { Alert, Center, Loader } from '@mantine/core'

import { PackageForm } from '../package-form/package-form'
import { useFetchPackage, useUpdatePackage } from '../../queries/queries'
import { PackageFields } from '../../types/package-fields'

export const UpdatePackage = () => {
  const {
    query: { id },
  } = useRouter()

  const updateMutation = useUpdatePackage(Number(id))

  const handleSubmit = async (body: PackageFields) => {
    try {
      await updateMutation.mutateAsync({
        id: Number(id),
        body,
      })
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const {
    data: recipe,
    status,
    error,
    isFetching,
  } = useFetchPackage(Number(id))

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
        <PackageForm
          submit={handleSubmit}
          loading={updateMutation.isLoading}
          error={updateMutation.error?.message || ''}
          submitTitle={'Сохранить'}
          //@ts-ignore
          initialData={{
            ...recipe!.data,
          }}
        />
      )}
    </>
  )
}
