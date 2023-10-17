import { Button, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { CategoryForm } from '../category-form/category-form'
import { useCreateCategory } from '../../queries/queries'
import { CategoryFields } from '../../types/category-fields'

export const CreateCategory = () => {
  const [opened, { open, close }] = useDisclosure(false)

  const createMutation = useCreateCategory(close)

  const handleSubmit = async (data: CategoryFields) => {
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
      <Button onClick={open}>Создать категорию</Button>

      <Modal
        opened={opened}
        onClose={resetMutationAndClose}
        centered
        title="Создание категорий"
        size={'lg'}
      >
        <CategoryForm
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
