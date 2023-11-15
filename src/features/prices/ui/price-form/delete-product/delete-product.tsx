import { ActionIcon, ActionIconProps } from '@mantine/core'
import { IconTrashFilled } from '@tabler/icons-react'

import { useFormContext } from '../form-context'

import { ConfirmPopover } from '@/shared/ui/confirm-popover/confirm-popover'

interface DeleteProductProps extends ActionIconProps {
  idx: number
}

export const DeleteProduct = (props: DeleteProductProps) => {
  const { idx, ...other } = props
  const form = useFormContext()

  const handleDelete = () => {
    form.removeListItem('products', idx)
  }

  return (
    <ConfirmPopover ok={handleDelete}>
      {(open) => (
        <ActionIcon onClick={open} color="red" size={'lg'} {...other}>
          <IconTrashFilled
            style={{ width: '70%', height: '70%' }}
            stroke={1.5}
          />
        </ActionIcon>
      )}
    </ConfirmPopover>
  )
}
