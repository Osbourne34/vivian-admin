import { ActionIcon, Group, Tooltip } from '@mantine/core'

import { IconEdit, IconEye, IconTrashFilled } from '@tabler/icons-react'

interface ActionsProps {
  onUpdate: () => void
  onDelete: () => void
  onPreview?: () => void
}

export const Actions = (props: ActionsProps) => {
  const { onUpdate, onDelete, onPreview } = props

  return (
    <Group gap="xs" justify="flex-end">
      {onPreview && (
        <ActionIcon
          onClick={onPreview}
          color="gray"
          size="lg"
          variant="subtle"
          radius="xl"
        >
          <IconEye style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </ActionIcon>
      )}

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
