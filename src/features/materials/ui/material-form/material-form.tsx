import {
  Alert,
  Button,
  Grid,
  Group,
  NumberInput,
  Select,
  TextInput,
} from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'
import { useQuery } from '@tanstack/react-query'

import { MaterialFields } from '../../types/material-fields'
import { initialValues } from './initial-values'

import { Filters } from '@/shared/api/filters/filters'
import { Error } from '@/shared/http/types'

interface MaterialFormProps {
  initialData?: MaterialFields
  submit: (body: MaterialFields) => Promise<unknown>
  loading: boolean
  error: string
  titleSubmit: string
}

export const MaterialForm = (props: MaterialFormProps) => {
  const {
    initialData = initialValues,
    submit,
    loading,
    titleSubmit,
    error,
  } = props

  const { setFieldError, reset, getInputProps, isDirty, onSubmit } =
    useForm<MaterialFields>({
      initialValues: initialData,
      validate: {
        name: isNotEmpty('Обязательное поле'),
        unit: isNotEmpty('Обязательное поле'),
        price: isNotEmpty('Обязательное поле'),
        count: isNotEmpty('Обязательное поле'),
        type_id: isNotEmpty('Обязательное поле'),
      },
    })

  const handleSubmit = async (data: MaterialFields) => {
    try {
      await submit(data)
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

  const { data: materialTypes } = useQuery({
    queryFn: Filters.getMaterialTypes,
    queryKey: ['material-types-select'],
    select: (data) => {
      const newData = data.data.map((type) => {
        return {
          value: String(type.id),
          label: type.name,
        }
      })

      return {
        data: newData,
        status: data.status,
      }
    },
  })

  const { data: materialUnits } = useQuery({
    queryFn: Filters.getMaterialUnits,
    queryKey: ['material-units'],
    select: (data) => {
      const newData = data.data.map((unit) => {
        return {
          value: unit.value,
          label: unit.title,
        }
      })

      return {
        data: newData,
        status: data.status,
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
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <TextInput
            label={'Название'}
            size={'md'}
            withAsterisk
            {...getInputProps('name')}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <Select
            label={'Тип материала'}
            data={materialTypes?.data}
            size={'md'}
            withAsterisk
            searchable
            {...getInputProps('type_id')}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <Select
            label={'Ед. измерения'}
            data={materialUnits?.data}
            size={'md'}
            withAsterisk
            {...getInputProps('unit')}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <NumberInput
            label="Цена"
            size="md"
            withAsterisk
            thousandSeparator=" "
            allowNegative={false}
            hideControls
            {...getInputProps('price')}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <NumberInput
            label="Количество"
            size="md"
            withAsterisk
            allowNegative={false}
            hideControls
            {...getInputProps('count')}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <NumberInput
            label="Транспортные расходы"
            size="md"
            thousandSeparator=" "
            allowNegative={false}
            hideControls
            {...getInputProps('transport_costs')}
          />
        </Grid.Col>
      </Grid>
      <Group mt={'xl'} justify={'flex-end'}>
        <Button loading={loading} disabled={!isDirty()} type={'submit'}>
          {titleSubmit}
        </Button>
      </Group>
    </form>
  )
}
