import { ActionIcon, Group, Tooltip } from '@mantine/core'

import { IconEdit, IconTrashFilled } from '@tabler/icons-react'

interface ActionsProps {
  onUpdate: () => void
  onDelete: () => void
}

export const Actions = (props: ActionsProps) => {
  const { onUpdate, onDelete } = props

  return (
    <Group gap="xs" justify="flex-end">
      <Tooltip label="Редактировать">
        <ActionIcon onClick={onUpdate} size="lg" variant="subtle" radius="xl">
          <IconEdit style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Удалить">
        <ActionIcon
          onClick={onDelete}
          size="lg"
          variant="subtle"
          color="red"
          radius="xl"
        >
          <IconTrashFilled
            style={{ width: '70%', height: '70%' }}
            stroke={1.5}
          />
        </ActionIcon>
      </Tooltip>
    </Group>
  )
}
