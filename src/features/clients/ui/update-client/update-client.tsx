import { FormEvent } from 'react'
import { useRouter } from 'next/router'

import { Alert, Center, Loader } from '@mantine/core'
import dayjs from 'dayjs'

import { ClientFrom } from '../client-form/client-form'
import { useFetchClient, useUpdateClient } from '../../queries/queries'
import { ClientFields } from '../../types/client-fields'

export const UpdateClient = () => {
  const { query } = useRouter()

  const updateMutation = useUpdateClient(Number(query.id))

  const handleSubmit = async (
    data: ClientFields,
    event: FormEvent<HTMLFormElement>,
  ) => {
    const formData = new FormData(event.currentTarget)
    if (data.password === '') {
      formData.delete('password')
      formData.delete('password_confirmation')
    }
    formData.set('phone', data.phone)
    formData.set('birthday', String(data.birthday))
    formData.set('active', data.active ? '1' : '0')
    formData.append('_method', 'PUT')

    try {
      await updateMutation.mutateAsync({
        id: Number(query.id),
        body: formData,
      })
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const { data, status, error } = useFetchClient(Number(query.id))

  const isLoading = status === 'loading'
  const isError = status === 'error'
  const isSuccess = status === 'success'

  return (
    <>
      {isLoading && (
        <Center>
          <Loader />
        </Center>
      )}

      {isError && (
        <Alert title="Ошибка" color="red" variant="filled">
          {error?.message}
        </Alert>
      )}

      {isSuccess && (
        <ClientFrom
          initialData={{
            ...data!.data,
            address: data?.data.address ? data.data.address : '',
            avatar: data?.data.avatar ? new File([], data.data.avatar) : null,
            birthday: data?.data.birthday
              ? dayjs(data.data.birthday.split('.').reverse().join('.'))
              : null,
            branch_id: data?.data.branch_id ? String(data.data.branch_id) : '',
            description: data?.data.description ? data.data.description : '',
            password: '',
            password_confirmation: '',
            phone: data?.data.phone.slice(3)!,
            manager_id: data?.data.manager_id
              ? String(data.data.manager_id)
              : '',
          }}
          submit={handleSubmit}
          loading={updateMutation.isLoading}
          error={updateMutation.error?.message || ''}
          requiredPassword={false}
          titleSubmit="Сохранить"
        />
      )}
    </>
  )
}
