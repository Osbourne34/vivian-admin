import { ReactNode } from 'react'

import { Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { EmployeesList } from '../employees-list/employees-list'
import { IndividualPriceEmployee } from '../../../types/individual-price'

interface EmployeesModalsProps {
  children: (open: () => void) => ReactNode
  action: (employee: IndividualPriceEmployee) => ReactNode
}

export const EmployeesModal = (props: EmployeesModalsProps) => {
  const { children, action } = props
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      {children(open)}
      <Modal
        opened={opened}
        onClose={close}
        title={'Сотрудники'}
        size="xl"
        yOffset={20}
      >
        <EmployeesList action={action} />
      </Modal>
    </>
  )
}
