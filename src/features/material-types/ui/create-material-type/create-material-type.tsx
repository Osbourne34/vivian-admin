import { Button, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { MaterialTypeForm } from '../material-type-form/material-type-form'
import { useCreateMaterialType } from '../../queries/queries'
import { MaterialTypeFields } from '../../types/material-type-fields'

export const CreateMaterialType = () => {
  const [opened, { open, close }] = useDisclosure(false)

  const createMutation = useCreateMaterialType(close)

  const handleSubmit = async (data: MaterialTypeFields) => {
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
      <Button onClick={open}>Создать тип материала</Button>

      <Modal
        opened={opened}
        onClose={resetMutationAndClose}
        centered
        title="Создание типа материала"
        size={'lg'}
      >
        <MaterialTypeForm
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
