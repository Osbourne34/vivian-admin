import {
  Alert,
  Button,
  Checkbox,
  Group,
  Select,
  Stack,
  TextInput,
} from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'

import { useFetchParentBranches } from '../../queries/queries'
import { initialValues } from './initial-values'
import { BranchFields } from '../../types/branch-fields'

import { Error } from '@/shared/types/http'

interface OrientFormProps {
  initialData?: BranchFields
  submit: (body: BranchFields) => Promise<unknown>
  isLoading: boolean
  error: string
  onCancel: () => void
  submitTitle: string
}

export const BranchForm = (props: OrientFormProps) => {
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

  const { data: branches } = useFetchParentBranches()

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
        <Select
          label="Родительский регион"
          data={branches}
          clearable
          size="md"
          {...getInputProps('parent_id')}
        />
        <Checkbox
          label="Имеется склад?"
          {...getInputProps('warehouse', { type: 'checkbox' })}
        />
      </Stack>

      <Group justify="flex-end" mt="xl">
        <Button disabled={isLoading} variant="outline" onClick={onCancel}>
          Отмена
        </Button>
        <Button disabled={!isDirty()} loading={isLoading} type="submit">
          {submitTitle}
        </Button>
      </Group>
    </form>
  )
}
