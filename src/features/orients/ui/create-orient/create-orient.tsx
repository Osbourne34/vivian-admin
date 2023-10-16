import { Button, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { OrientForm } from '../orient-form/orient-form'
import { initialValues } from '../orient-form/initial-values'
import { useCreateOrient } from '../../queries/queries'
import { OrientFields } from '../../types/orient-fields'

export const CreateOrient = () => {
  const [opened, { open, close }] = useDisclosure(false)

  const createMutation = useCreateOrient(close)

  const handleSubmit = async (data: OrientFields) => {
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
      <Button onClick={open}>Создать ориентир</Button>

      <Modal
        opened={opened}
        onClose={resetMutationAndClose}
        centered
        title="Создание ориентира"
        size={'lg'}
      >
        <OrientForm
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
