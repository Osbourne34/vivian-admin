import { Alert, Button, Group, Stack, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'

import { OrientFields } from '../../types/orient-fields'
import { GroupBranchesSelect } from '@/features/branches'

import { Error } from '@/shared/http/types'
import { isEmpty } from '@/shared/utils/is-empty'

interface OrientFormProps {
  initialData: OrientFields
  submit: (body: OrientFields) => Promise<unknown>
  isLoading: boolean
  error: string
  onCancel: () => void
  submitTitle: string
}

export const OrientForm = (props: OrientFormProps) => {
  const { initialData, submit, isLoading, error, onCancel, submitTitle } = props

  const { getInputProps, onSubmit, values, setFieldError } = useForm({
    initialValues: initialData,
    validate: {
      name: (value) => {
        if (isEmpty(value)) return 'Обязательное поле'
      },
      branch_id: (value) => {
        if (isEmpty(value)) return 'Обязательное поле'
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
        <GroupBranchesSelect
          label="Регион"
          allowDeselect={false}
          size="md"
          withAsterisk
          {...getInputProps('branch_id')}
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
