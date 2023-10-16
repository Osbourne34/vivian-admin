import { Alert, Center, Loader } from '@mantine/core'
import { modals } from '@mantine/modals'

import { BranchForm } from '../branch-form/branch-form'
import { useFetchBranch, useUpdateBranch } from '../../queries/queries'
import { BranchFields } from '../../types/branch-fields'

interface UpdateBranchProps {
  branchId: number
}

export const UpdateBranch = (props: UpdateBranchProps) => {
  const { branchId } = props

  const updateMutation = useUpdateBranch(branchId)

  const handleSubmit = async (data: BranchFields) => {
    try {
      await updateMutation.mutateAsync({ id: branchId, body: data })
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const { data, status, error } = useFetchBranch(branchId)

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
        <BranchForm
          initialData={{
            name: data?.data.name!,
            parent_id:
              data?.data.parent_id !== 0 ? String(data?.data.parent_id) : '',
            warehouse: data?.data.warehouse!,
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
