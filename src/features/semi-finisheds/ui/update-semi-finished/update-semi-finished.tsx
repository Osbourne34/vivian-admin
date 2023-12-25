import { useRouter } from 'next/router'
import {
  useFetchSemiFinished,
  useUpdateSemiFinished,
} from '../../queries/queries'
import {
  Alert,
  Button,
  Card,
  Center,
  Container,
  Group,
  Loader,
  NumberInput,
  Stack,
  TextInput,
  Textarea,
} from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'
import { UpdateSemiFinishedFields } from '../../types/update-semi-finished-fields'

import { Error } from '@/shared/types/http'

export const UpdateSemiFinished = () => {
  const {
    query: { id },
  } = useRouter()

  const updateMutation = useUpdateSemiFinished(Number(id))

  const handleSubmit = async (body: UpdateSemiFinishedFields) => {
    try {
      await updateMutation.mutateAsync({
        semiFinishedId: Number(id),
        body,
      })
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const { data: semiFinished, status, error } = useFetchSemiFinished(Number(id))

  const isError = status === 'error'
  const isSuccess = status === 'success'
  const isFetching = status === 'loading'

  return (
    <>
      {isFetching && (
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
        <Form
          initialData={{
            losses: String(semiFinished?.data.losses),
            name: String(semiFinished?.data.name),
            description: semiFinished?.data.description
              ? semiFinished.data.description
              : '',
          }}
          submit={handleSubmit}
          loading={updateMutation.isLoading}
          error={updateMutation.error?.message || ''}
        />
      )}
    </>
  )
}

interface FormProps {
  initialData: UpdateSemiFinishedFields
  submit: (body: UpdateSemiFinishedFields) => Promise<unknown>
  loading: boolean
  error: string
}

const Form = (props: FormProps) => {
  console.log(props)

  const form = useForm({
    initialValues: props.initialData,
    validate: {
      name: isNotEmpty('Обязательное поле'),
    },
  })

  const handleSubmit = async (body: typeof form.values) => {
    try {
      await props.submit(body)
    } catch (error) {
      const err = error as Error

      if (err.errors) {
        err.errors.forEach((error) => {
          form.setFieldError(error.input, error.message)
        })
      }
    }
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Container>
        <Card shadow="sm" withBorder>
          <Stack>
            {props.error && (
              <Alert title="Ошибка" color="red" variant="filled">
                {props.error}
              </Alert>
            )}

            <TextInput
              label="Название"
              size="md"
              withAsterisk
              {...form.getInputProps('name')}
            />
            <NumberInput
              label="Потери"
              allowNegative={false}
              size="md"
              hideControls
              {...form.getInputProps('losses')}
            />
            <Textarea
              label="Описание"
              size="md"
              minRows={2}
              autosize
              {...form.getInputProps('description')}
            />
          </Stack>

          <Group mt="lg" justify="flex-end">
            <Button
              type="submit"
              disabled={!form.isDirty()}
              loading={props.loading}
            >
              Сохранить
            </Button>
          </Group>
        </Card>
      </Container>
    </form>
  )
}
