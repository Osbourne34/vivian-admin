import { Alert, Center, Loader } from '@mantine/core'
import { modals } from '@mantine/modals'

import { RoleForm } from '../role-form/role-form'
import { useFetchRole, useUpdateRole } from '../../queries/queries'
import { RoleFields } from '../../types/role-fields'

interface UpdateRoleProps {
  roleId: number
}

export const UpdateRole = (props: UpdateRoleProps) => {
  const { roleId } = props

  const updateMutation = useUpdateRole(roleId)

  const handleSubmit = async (data: RoleFields) => {
    try {
      await updateMutation.mutateAsync({ id: roleId, body: data })
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const { data, status, error } = useFetchRole(roleId)

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
        <RoleForm
          initialData={{
            name: data?.data.name!,
            permissions: data?.data.permissions.map((permission) =>
              String(permission.id)
            )!,
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
