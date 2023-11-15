import { ActionIcon } from '@mantine/core'
import { IconTrashFilled } from '@tabler/icons-react'

import { useFormContext } from '../form-context'

import { ConfirmPopover } from '@/shared/ui/confirm-popover/confirm-popover'

interface DeleteProductProps {
  comboIdx: number
  productIdx: number
}

export const DeleteProduct = (props: DeleteProductProps) => {
  const { productIdx, comboIdx } = props

  const form = useFormContext()

  const removeProductToCombo = () => {
    form.removeListItem(`combos.${comboIdx}.products`, productIdx)
  }

  return (
    <ConfirmPopover ok={removeProductToCombo}>
      {(open) => (
        <ActionIcon
          onClick={() => {
            open()
          }}
          variant="outline"
          color="red"
        >
          <IconTrashFilled
            style={{ width: '70%', height: '70%' }}
            stroke={1.5}
          />
        </ActionIcon>
      )}
    </ConfirmPopover>
  )
}
