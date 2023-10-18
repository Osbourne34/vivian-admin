import { FormEvent } from 'react'

import {
  Alert,
  Button,
  Checkbox,
  Grid,
  Group,
  PasswordInput,
  Select,
  TextInput,
  Textarea,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { DatePickerInput } from '@mantine/dates'
import { useQuery } from '@tanstack/react-query'

import dayjs from 'dayjs'
import 'dayjs/locale/ru'

import { GroupBranchesSelect } from '@/features/branches'
import { initialValues } from './initial-values'
import { ClientFields } from '../../types/client-fields'

import { Filters } from '@/shared/api/filters/filters'
import { UploadAvatar } from '@/shared/ui/upload-avatar/upload-avatar'
import { PhoneInput } from '@/shared/ui/phone-input/phone-input'
import { isEmpty } from '@/shared/utils/is-empty'
import { minLength } from '@/shared/utils/min-length'
import { Error } from '@/shared/http/types'

interface EmployeeFormProps {
  initialData?: ClientFields
  submit: (
    body: ClientFields,
    event: FormEvent<HTMLFormElement>,
  ) => Promise<unknown>
  loading: boolean
  error: string
  requiredPassword: boolean
  titleSubmit: string
}

export const ClientFrom = (props: EmployeeFormProps) => {
  const {
    initialData = initialValues,
    submit,
    loading,
    error,
    titleSubmit,
    requiredPassword,
  } = props

  const {
    getInputProps,
    setFieldValue,
    onSubmit,
    reset,
    values,
    setFieldError,
  } = useForm<ClientFields>({
    validate: {
      name: (value) => {
        if (isEmpty(value)) return 'Обязательное поле'
        if (minLength(value, 3)) return 'Имя должно содержать минимум 3 символа'
      },
      phone: (value) => {
        if (isEmpty(value)) return 'Обязательное поле'
        if (minLength(value, 9)) return 'Невалидный номер телефона'
      },
      password: (value) => {
        if (isEmpty(value) && requiredPassword) return 'Обязательное поле'
        if (minLength(value, 6) && (requiredPassword || !isEmpty(value)))
          return 'Пароль должен содержать минимум 6 символов'
      },
      password_confirmation: (value, values) => {
        if (isEmpty(value) && requiredPassword) return 'Обязательное поле'
        if (value !== values.password) return 'Пароли не совпадают'
      },
    },
    initialValues: initialData,
    transformValues: (values) => {
      return {
        ...values,
        phone: `998${values.phone}`,
        birthday: dayjs(values.birthday).isValid()
          ? dayjs(values.birthday).format('DD.MM.YYYY')
          : '',
      }
    },
  })

  const handleSubmit = async (
    data: typeof values,
    event?: FormEvent<HTMLFormElement>,
  ) => {
    try {
      await submit(data, event!)
      reset()
    } catch (error) {
      const err = error as Error

      if (err.errors) {
        err.errors.forEach(({ input, message }) => {
          setFieldError(input, message)
        })
      }
    }
  }

  const { data: managers } = useQuery(['managers'], Filters.getManagers, {
    select: (data) => {
      const newData = data.data.map((manager) => {
        return {
          value: String(manager.id),
          label: manager.name,
        }
      })

      return {
        status: data.status,
        data: newData,
      }
    },
  })

  return (
    <form onSubmit={onSubmit(handleSubmit)}>
      {error && (
        <Alert title="Ошибка" color="red" variant="filled" mb="lg">
          {error}
        </Alert>
      )}
      <Grid>
        <Grid.Col span={3}>
          <UploadAvatar
            isUpdate={!requiredPassword}
            name="avatar"
            {...getInputProps('avatar')}
          />

          <Checkbox
            mt="xl"
            name="active"
            label="Активировать аккаунт"
            {...getInputProps('active', {
              type: 'checkbox',
            })}
          />
        </Grid.Col>
        <Grid.Col span={9}>
          <Grid>
            <Grid.Col span={6}>
              <TextInput
                name="name"
                label="Имя"
                size="md"
                withAsterisk
                {...getInputProps('name')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <PhoneInput
                name="phone"
                label="Номер телефона"
                withAsterisk
                {...getInputProps('phone')}
                onValueChange={(values) => {
                  setFieldValue('phone', values.value)
                }}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <DatePickerInput
                name="birthday"
                locale="ru"
                label="День рождение"
                valueFormat="DD.MM.YYYY"
                maxDate={new Date()}
                clearable
                size="md"
                {...getInputProps('birthday')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                name="address"
                label="Адресс"
                size="md"
                {...getInputProps('address')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <PasswordInput
                name="password"
                label="Пароль"
                withAsterisk={requiredPassword}
                size="md"
                {...getInputProps('password')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <PasswordInput
                name="password_confirmation"
                label="Повторите пароль"
                withAsterisk={requiredPassword}
                size="md"
                {...getInputProps('password_confirmation')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <GroupBranchesSelect
                name="branch_id"
                label="Регион"
                size="md"
                allowDeselect={false}
                clearable
                {...getInputProps('branch_id')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Select
                name="manager_id"
                label="Менеджер"
                data={managers?.data}
                size="md"
                allowDeselect={false}
                clearable
                {...getInputProps('manager_id')}
              />
            </Grid.Col>
            <Grid.Col>
              <Textarea
                name="description"
                label="Описание"
                minRows={4}
                autosize
                size="md"
                {...getInputProps('description')}
              />
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
      <Group justify="flex-end" mt="xl">
        <Button loading={loading} type="submit">
          {titleSubmit}
        </Button>
      </Group>
    </form>
  )
}
