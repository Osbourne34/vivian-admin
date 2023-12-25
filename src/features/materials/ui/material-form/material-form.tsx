import {
  Alert,
  Button,
  Grid,
  Group,
  NumberInput,
  TextInput,
  Text,
} from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'

import { MaterialTypesSelect } from '@/features/material-types'

import { UnitsSelect } from '../units-select/units-select'
import { MaterialFields } from '../../types/material-fields'
import { initialValues } from './initial-values'

import { Error } from '@/shared/types/http'
import { PriceInput } from '@/shared/ui/price-input/price-input'

interface MaterialFormProps {
  initialData?: MaterialFields
  submit: (body: MaterialFields) => Promise<unknown>
  loading: boolean
  error: string
  titleSubmit: string
  additionally?: string
}

export const MaterialForm = (props: MaterialFormProps) => {
  const {
    initialData = initialValues,
    submit,
    loading,
    titleSubmit,
    error,
    additionally,
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
        losses: (value, values) => {
          return value > values.count
            ? 'Потерии не могут быть больше количества'
            : null
        },
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
          <MaterialTypesSelect
            label={'Тип материала'}
            withAsterisk
            searchable
            size={'md'}
            {...getInputProps('type_id')}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <UnitsSelect
            label={'Ед. измерения'}
            withAsterisk
            size={'md'}
            {...getInputProps('unit')}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <PriceInput
            label="Цена"
            size="md"
            withAsterisk
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
        </Grid.Col>{' '}
        <Grid.Col span={{ base: 12, lg: 12 }}>
          <NumberInput
            label="Потери"
            size="md"
            hideControls
            {...getInputProps('losses')}
          />
        </Grid.Col>
      </Grid>
      {additionally && <Text mt={'lg'}>Остаток в базе: {additionally}</Text>}
      <Group mt={'xl'} justify={'flex-end'}>
        <Button loading={loading} disabled={!isDirty()} type={'submit'}>
          {titleSubmit}
        </Button>
      </Group>
    </form>
  )
}
