import { ActionIcon } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { useFormContext } from '../form-context'
import { useMemo } from 'react'
import { IndividualPriceEmployee } from '../../../types/individual-price'

interface AddEmployeeProps {
  employee: IndividualPriceEmployee
}

export const AddEmployee = (props: AddEmployeeProps) => {
  const { employee } = props
  const form = useFormContext()

  const addEmployee = () => {
    console.log('click')
    form.insertListItem('employees', employee)
    form.clearFieldError('employees')
  }

  const existsEmployee = useMemo(
    () => form.values.employees.some(({ id }) => employee.id === id),
    [employee, form.values.employees],
  )

  return (
    <ActionIcon onClick={() => addEmployee()} disabled={existsEmployee}>
      <IconPlus style={{ width: '70%', height: '70%' }} stroke={1.5} />
    </ActionIcon>
  )
}
