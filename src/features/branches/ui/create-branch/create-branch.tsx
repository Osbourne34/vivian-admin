import { Button, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { BranchForm } from '../branch-form/branch-form'
import { initialValues } from '../branch-form/initial-values'
import { BranchFields } from '../../types/branch-fields'
import { useCreateBranch } from '../../queries/queries'

export const CreateBranch = () => {
  const [opened, { open, close }] = useDisclosure(false)

  const createMutation = useCreateBranch(close)

  const handleSubmit = async (data: BranchFields) => {
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
      <Button onClick={open}>Создать регион</Button>

      <Modal
        opened={opened}
        onClose={resetMutationAndClose}
        centered
        title="Создание региона"
        size={'lg'}
      >
        <BranchForm
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
