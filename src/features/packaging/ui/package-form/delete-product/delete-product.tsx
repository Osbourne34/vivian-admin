import { ActionIcon } from '@mantine/core'
import { IconTrashFilled } from '@tabler/icons-react'
import { useFormContext } from '../form-context'

import { ConfirmPopover } from '@/shared/ui/confirm-popover/confirm-popover'

export const DeleteProduct = () => {
  const form = useFormContext()

  const deleteProduct = () => {
    form.setFieldValue('product_id', '')
    form.setFieldValue('product', null)
  }

  return (
    <ConfirmPopover ok={deleteProduct}>
      {(open) => (
        <ActionIcon color={'red'} onClick={open}>
          <IconTrashFilled
            style={{ width: '70%', height: '70%' }}
            stroke={1.5}
          />
        </ActionIcon>
      )}
    </ConfirmPopover>
  )
}
