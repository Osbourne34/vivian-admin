import { useFormContext } from '../form-context'
import { ConfirmPopover } from '@/shared/ui/confirm-popover/confirm-popover'
import { ActionIcon } from '@mantine/core'
import { IconTrashFilled } from '@tabler/icons-react'

interface DeleteEmployeeProps {
  idx: number
}

export const DeleteEmployee = (props: DeleteEmployeeProps) => {
  const { idx } = props
  const form = useFormContext()

  const handleDelete = () => {
    form.removeListItem('employees', idx)
  }

  return (
    <ConfirmPopover ok={handleDelete}>
      {(open) => (
        <ActionIcon onClick={open} color="red" size={'lg'}>
          <IconTrashFilled
            style={{ width: '70%', height: '70%' }}
            stroke={1.5}
          />
        </ActionIcon>
      )}
    </ConfirmPopover>
  )
}
