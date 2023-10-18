import { FormEvent } from 'react'

import { ClientFrom } from '../client-form/client-form'
import { useCreateClient } from '../../queries/queries'
import { ClientFields } from '../../types/client-fields'

export const CreateClient = () => {
  const createMutation = useCreateClient()

  const handleSubmit = async (
    data: ClientFields,
    event: FormEvent<HTMLFormElement>,
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
    <ClientFrom
      submit={handleSubmit}
      loading={createMutation.isLoading}
      error={createMutation.error?.message || ''}
      requiredPassword={true}
      titleSubmit="Создать"
    />
  )
}
