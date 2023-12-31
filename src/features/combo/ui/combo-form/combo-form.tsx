import {
  Button,
  Grid,
  Group,
  NumberInput,
  TextInput,
  Text,
  Alert,
} from '@mantine/core'
import { isNotEmpty } from '@mantine/form'

import { Combo } from './combo/combo'
import { FormProvider, useForm } from './form-context'
import { initialValues } from './initial-values'
import { ComboFields } from '../../types/combo-fields'

import { Error } from '@/shared/types/http'
import { PriceInput } from '@/shared/ui/price-input/price-input'

interface ComboFormProps {
  initialData?: ComboFields
  submit: (body: ComboFields) => Promise<unknown>
  isLoading: boolean
  error: string
  submitTitle: string
}

export const ComboForm = (props: ComboFormProps) => {
  const {
    error,
    isLoading,
    submit,
    submitTitle,
    initialData = initialValues,
  } = props

  const form = useForm({
    initialValues: initialData,
    validate: {
      name: isNotEmpty('Обязательное поле'),
      price: isNotEmpty('Обязательное поле'),
      point: isNotEmpty('Обязательное поле'),
      combos: {
        limit: isNotEmpty('Обязательное поле'),
        products: isNotEmpty('Добавьте продукты'),
      },
    },
  })

  const handleSubmit = async (data: ComboFields) => {
    try {
      await submit(data)
      form.reset()
    } catch (error) {
      const err = error as Error

      if (err.errors) {
        err.errors.forEach(({ input, message }) => {
          form.setFieldError(input, message)
        })
      }
    }
  }

  const addCombo = () => {
    form.insertListItem('combos', {
      id: Date.now(),
      limit: '',
      products: [],
    })
  }

  const removableCombo = form.values.combos.length > 1

  return (
    <FormProvider form={form}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        {error && (
          <Alert title="Ошибка" color="red" variant="filled" mb="lg">
            {error}
          </Alert>
        )}

        <Grid>
          <Grid.Col span={{ base: 12, lg: 6, xl: 8 }}>
            <TextInput
              label="Название"
              withAsterisk
              size="md"
              {...form.getInputProps('name')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, lg: 3, xl: 2 }}>
            <PriceInput
              label="Цена"
              withAsterisk
              size="md"
              {...form.getInputProps('price')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, lg: 3, xl: 2 }}>
            <NumberInput
              label="Поинт"
              withAsterisk
              allowNegative={false}
              hideControls
              size="md"
              {...form.getInputProps('point')}
            />
          </Grid.Col>
        </Grid>

        <Text size="lg" mt={'lg'} mb={'md'} fw={500}>
          Список комбинаций
        </Text>

        <Grid>
          {form.values.combos.map((combo, index) => {
            return (
              <Grid.Col key={combo.id} span={{ base: 12, lg: 6, xl: 4 }}>
                <Combo removable={removableCombo} comboIdx={index} {...combo} />
              </Grid.Col>
            )
          })}
          <Grid.Col span={{ base: 12, lg: 6, xl: 4 }}>
            <Button onClick={addCombo} variant="default" fullWidth>
              Добавить Комбо
            </Button>
          </Grid.Col>
        </Grid>
        <Group mt="lg" justify="flex-end">
          <Button
            disabled={!form.isDirty()}
            loading={isLoading}
            size="md"
            type="submit"
          >
            {submitTitle}
          </Button>
        </Group>
      </form>
    </FormProvider>
  )
}
