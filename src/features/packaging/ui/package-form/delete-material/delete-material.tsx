import { ActionIcon, ActionIconProps } from '@mantine/core'
import { IconTrashFilled } from '@tabler/icons-react'

import { useFormContext } from '../form-context'

import { ConfirmPopover } from '@/shared/ui/confirm-popover/confirm-popover'

interface DeleteMaterialProps extends ActionIconProps {
  index: number
}

export const DeleteMaterial = (props: DeleteMaterialProps) => {
  const form = useFormContext()

  const deleteMaterial = () => {
    form.removeListItem(`materials`, props.index)
  }

  return (
    <ConfirmPopover ok={deleteMaterial}>
      {(open) => {
        return (
          <ActionIcon color={'red'} onClick={open} {...props}>
            <IconTrashFilled
              style={{ width: '70%', height: '70%' }}
              stroke={1.5}
            />
          </ActionIcon>
        )
      }}
    </ConfirmPopover>
  )
}
