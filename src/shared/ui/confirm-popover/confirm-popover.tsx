import { ReactNode, useState } from 'react'

import { Popover, Text, Group, Button } from '@mantine/core'

interface ConfirmPopoverProps {
  children: (open: () => void) => ReactNode
  ok: () => void
}

export const ConfirmPopover = (props: ConfirmPopoverProps) => {
  const { children, ok } = props

  const [opened, setOpened] = useState(false)

  const handleOpen = () => {
    setOpened(true)
  }

  const handleClose = () => {
    setOpened(false)
  }

  return (
    <Popover opened={opened} onClose={handleClose} width={180}>
      <Popover.Target>{children(handleOpen)}</Popover.Target>
      <Popover.Dropdown>
        <Text size="sm">Удалить?</Text>
        <Group gap="sm" justify="flex-end" mt="sm">
          <Button onClick={handleClose} variant="outline" size="xs">
            Нет
          </Button>
          <Button onClick={ok} color="red" size="xs">
            Да
          </Button>
        </Group>
      </Popover.Dropdown>
    </Popover>
  )
}
