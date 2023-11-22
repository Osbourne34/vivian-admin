import { Alert, Button, Group, Stack, TextInput } from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'

import { MaterialTypeFields } from '../../types/material-type-fields'
import { initialValues } from './initial-values'

import { Error } from '@/shared/types/http'

interface MaterialTypeFormProps {
  initialData?: MaterialTypeFields
  submit: (body: MaterialTypeFields) => Promise<unknown>
  isLoading: boolean
  error: string
  onCancel: () => void
  submitTitle: string
}

export const MaterialTypeForm = (props: MaterialTypeFormProps) => {
  const {
    initialData = initialValues,
    submit,
    isLoading,
    error,
    onCancel,
    submitTitle,
  } = props

  const { getInputProps, onSubmit, values, setFieldError, isDirty } = useForm({
    initialValues: initialData,
    validate: {
      name: isNotEmpty('Обязательное поле'),
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
      </Stack>

      <Group justify="flex-end" mt="xl">
        <Button disabled={isLoading} variant="outline" onClick={onCancel}>
          Отмена
        </Button>
        <Button loading={isLoading} disabled={!isDirty()} type="submit">
          {submitTitle}
        </Button>
      </Group>
    </form>
  )
}
