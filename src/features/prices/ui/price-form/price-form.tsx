import {
  Alert,
  Grid,
  Group,
  Stack,
  Text,
  ScrollArea,
  TextInput,
  Switch,
  Card,
  Button,
  MultiSelect,
  Divider,
  Title,
} from '@mantine/core'
import { isNotEmpty } from '@mantine/form'
import { useQuery } from '@tanstack/react-query'

import { ProductsList } from '@/features/products'

import { FormProvider, useForm } from './form-context'
import { Product } from './product/product'
import { AddProduct } from './add-product/add-product'
import { initialValues } from './initial-values'
import { PriceFields } from '../../types/price-fields'

import { Filters } from '@/shared/api/filters/filters'
import { Error } from '@/shared/types/http'
import { selectItemsDto } from '@/shared/utils/select-items-dto'

interface PriceForm {
  initialData?: PriceFields
  submit: (body: PriceFields) => Promise<unknown>
  loading: boolean
  error: string
  submitTitle: string
}

export const PriceForm = (props: PriceForm) => {
  const {
    error,
    loading,
    submit,
    submitTitle,
    initialData = initialValues,
  } = props

  const form = useForm({
    initialValues: initialData,
    validate: {
      name: isNotEmpty('Обязательное поле'),
      employees: isNotEmpty('Обязательное поле'),
      products: {
        price: isNotEmpty('Обязательное поле'),
        point: isNotEmpty('Обязательное поле'),
      },
    },
  })

  const handleSubmit = async (data: typeof form.values) => {
    if (form.values.products.length === 0) {
      form.setFieldError('products', 'Добавьте продукты')
      return
    }

    try {
      await submit(data)
      form.reset()
    } catch (error) {
      const err = error as Error

      if (err.errors) {
        err.errors.forEach((error) => {
          form.setFieldError(error.input, error.message)
        })
      }
    }
  }

  const { data: employees } = useQuery(
    ['managersAndDeliveryman'],
    Filters.getManagersAndDeliveryman,
    {
      select: (data) => {
        return selectItemsDto(data.data, 'id', 'name')
      },
    },
  )

  return (
    <FormProvider form={form}>
      <Grid>
        <Grid.Col order={2} span={{ base: 12, xl: 5 }}>
          <Title order={3} mb={'md'}>
            Продукты
          </Title>
          <ScrollArea.Autosize mah={700} offsetScrollbars={'y'}>
            <ProductsList
              productAction={(product) => <AddProduct product={product} />}
            />
          </ScrollArea.Autosize>
        </Grid.Col>

        <Grid.Col order={1} span={{ base: 12, xl: 7 }}>
          <Card withBorder shadow="sm">
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Stack>
                {error && (
                  <Alert title="Ошибка" color="red" variant="filled">
                    {error}
                  </Alert>
                )}
                <TextInput label="Название" {...form.getInputProps('name')} />
                <MultiSelect
                  label="Сотрудники"
                  searchable
                  data={employees}
                  {...form.getInputProps('employees')}
                />
                <Switch
                  label="Активен"
                  {...form.getInputProps('active', { type: 'checkbox' })}
                />
              </Stack>
              {form.errors.products && (
                <Text mt="md" c="red" ta="center" size="xl">
                  {form.errors.products}
                </Text>
              )}
              {form.values.products.length > 0 && (
                <Stack mt="lg" gap={'sm'}>
                  {form.values.products.map((product, index) => (
                    <div key={product.id}>
                      <Divider mb={'sm'} />
                      <Product index={index} {...product} />
                      {form.values.products.length - 1 === index && (
                        <Divider mt="sm" />
                      )}
                    </div>
                  ))}
                </Stack>
              )}
              <Group mt="lg" justify="flex-end">
                <Button
                  disabled={!form.isDirty()}
                  loading={loading}
                  type="submit"
                >
                  {submitTitle}
                </Button>
              </Group>
            </form>
          </Card>
        </Grid.Col>
      </Grid>
    </FormProvider>
  )
}
