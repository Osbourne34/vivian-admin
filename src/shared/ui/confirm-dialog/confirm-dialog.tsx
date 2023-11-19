import { useState } from 'react'

import { Button, Group, Text } from '@mantine/core'
import { ContextModalProps } from '@mantine/modals'

export const ConfirmDialog = (
  props: ContextModalProps<{
    modalBody: string
    onConfirm: (modalId: string) => Promise<unknown>
  }>,
) => {
  const {
    context,
    id,
    innerProps: { modalBody, onConfirm },
  } = props
  const [isLoading, setIsLoading] = useState(false)

  const handleConfirm = async () => {
    setIsLoading(true)
    await onConfirm(id)
    setIsLoading(false)
  }

  return (
    <>
      <Text>{modalBody}</Text>
      <Group gap="sm" justify="flex-end" mt="md">
        <Button
          disabled={isLoading}
          onClick={() => context.closeModal(id)}
          variant="outline"
        >
          Отмена
        </Button>
        <Button loading={isLoading} onClick={handleConfirm}>
          Ок
        </Button>
      </Group>
    </>
  )
}
