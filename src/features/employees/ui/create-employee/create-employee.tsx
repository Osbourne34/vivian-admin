import { FormEvent } from 'react'

import { useCreateEmployee } from '../../queries/queries'
import { EmployeeFrom } from '../employee-form/employee-form'
import { initialValues } from '../employee-form/initial-values'
import { EmployeeFields } from '../../types/employee-fields'

export const CreateEmployee = () => {
  const createMutation = useCreateEmployee()

  const handleSubmit = async (
    data: EmployeeFields,
    event: FormEvent<HTMLFormElement>
  ) => {
    const formData = new FormData(event.currentTarget)
    formData.set('phone', data.phone)
    formData.set('birthday', String(data.birthday))
    formData.set('active', data.active ? '1' : '0')

    try {
      await createMutation.mutateAsync(formData)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return (
    <EmployeeFrom
      initialData={initialValues}
      submit={handleSubmit}
      loading={createMutation.isLoading}
      error={createMutation.error?.message || ''}
      requiredPassword={true}
      titleSubmit="Создать"
    />
  )
}
