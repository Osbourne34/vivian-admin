import { FormEvent } from 'react'
import { useRouter } from 'next/router'

import { Alert, Center, Loader } from '@mantine/core'
import dayjs from 'dayjs'

import { EmployeeFrom } from '../employee-form/employee-form'
import { useFetchEmployee, useUpdateEmployee } from '../../queries/queries'
import { EmployeeFields } from '../../types/employee-fields'

export const UpdateEmployee = () => {
  const { query } = useRouter()

  const updateMutation = useUpdateEmployee(Number(query.id))

  const handleSubmit = async (
    data: EmployeeFields,
    event: FormEvent<HTMLFormElement>
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

  const { data, status, error } = useFetchEmployee(Number(query.id))

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
        <EmployeeFrom
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
