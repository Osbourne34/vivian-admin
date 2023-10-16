import { Button, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { RoleForm } from '../role-form/role-form'
import { useCreateRole } from '../../queries/queries'
import { initialValues } from '../role-form/initial-values'
import { RoleFields } from '../../types/role-fields'

export const CreateRole = () => {
  const [opened, { open, close }] = useDisclosure(false)

  const createMutation = useCreateRole(close)

  const handleSubmit = async (data: RoleFields) => {
    try {
      await createMutation.mutateAsync(data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const resetMutationAndClose = () => {
    createMutation.reset()
    close()
  }

  return (
    <>
      <Button onClick={open}>Создать роль</Button>

      <Modal
        opened={opened}
        onClose={resetMutationAndClose}
        centered
        title="Создание роли"
        size={'lg'}
      >
        <RoleForm
          initialData={initialValues}
          submit={handleSubmit}
          isLoading={createMutation.isLoading}
          error={createMutation.error?.message || ''}
          onCancel={resetMutationAndClose}
          submitTitle="Создать"
        />
      </Modal>
    </>
  )
}
