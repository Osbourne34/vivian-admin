import {
  Alert,
  Button,
  Group,
  MultiSelect,
  Stack,
  TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useQuery } from '@tanstack/react-query'

import { initialValues } from './initial-values'
import { RoleFields } from '../../types/role-fields'

import { isEmpty } from '@/shared/utils/is-empty'
import { Error } from '@/shared/types/http'
import { Filters } from '@/shared/api/filters/filters'
import { selectItemsDto } from '@/shared/utils/select-items-dto'

interface RoleFormProps {
  initialData?: RoleFields
  submit: (body: RoleFields) => Promise<unknown>
  isLoading: boolean
  error: string
  onCancel: () => void
  submitTitle: string
}

export const RoleForm = (props: RoleFormProps) => {
  const {
    initialData = initialValues,
    submit,
    isLoading,
    error,
    onCancel,
    submitTitle,
  } = props

  const { getInputProps, onSubmit, values, setFieldError } = useForm({
    initialValues: initialData,
    validate: {
      name: (value) => {
        if (isEmpty(value)) return 'Обязательное поле'
      },
      permissions: (value) => {
        if (isEmpty(value as [])) return 'Обязательное поле'
      },
    },
  })

  const handleSubmit = async (body: typeof values) => {
    try {
      await submit(body)
    } catch (error) {
      const err = error as Error
      if (err.errors) {
        err.errors.forEach((error) => {
          setFieldError(error.input, error.message)
        })
      }
    }
  }

  const { data: roles } = useQuery(['permissions'], Filters.getPermissions, {
    select: (data) => {
      return selectItemsDto(data.data, 'id', 'name')
    },
  })

  return (
    <form onSubmit={onSubmit(handleSubmit)}>
      <Stack>
        {error && (
          <Alert title="Ошибка" color="red" variant="filled">
            {error}
          </Alert>
        )}

        <TextInput
          data-autofocus
          label="Название"
          size="md"
          withAsterisk
          {...getInputProps('name')}
        />
        <MultiSelect
          label="Права"
          data={roles}
          size="md"
          withAsterisk
          {...getInputProps('permissions')}
        />
      </Stack>
      <Group justify="flex-end" mt="xl">
        <Button disabled={isLoading} variant="outline" onClick={onCancel}>
          Отмена
        </Button>
        <Button loading={isLoading} type="submit">
          {submitTitle}
        </Button>
      </Group>
    </form>
  )
}
