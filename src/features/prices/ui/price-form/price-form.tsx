import { Fragment, ReactNode } from 'react'

import {
  Alert,
  Grid,
  Group,
  Stack,
  Text,
  TextInput,
  Switch,
  Card,
  Button,
  Divider,
  Box,
  Badge,
  Skeleton,
  Avatar,
  Modal,
} from '@mantine/core'
import { isNotEmpty } from '@mantine/form'

import { ProductsModal } from '@/features/products'

import { FormProvider, useForm } from './form-context'
import { Product } from './product/product'
import { AddProduct } from './add-product/add-product'
import { EmployeesModal } from './employees-modal/employee-modal'
import { AddEmployee } from './add-employee/add-employee'
import { DeleteEmployee } from './delete-employee/delete-employee'
import { initialValues } from './initial-values'
import { PriceFields } from '../../types/price-fields'

import { Error } from '@/shared/types/http'

import { useMediaQuery } from '@mantine/hooks'

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
      employees: isNotEmpty('Необходимо добавить сотрудников'),
      products: {
        price: isNotEmpty('Обязательное поле'),
        point: isNotEmpty('Обязательное поле'),
      },
    },
  })

  const handleSubmit = async (data: typeof form.values) => {
    if (form.values.products.length === 0) {
      form.setFieldError('products', 'Необходимо добавить продукты')
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

  const matches = useMediaQuery('(min-width: 36em)')

  return (
    <FormProvider form={form}>
      {error && (
        <Alert title="Ошибка" color="red" variant="filled" mb={'md'}>
          {error}
        </Alert>
      )}
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            label="Название"
            withAsterisk
            {...form.getInputProps('name')}
          />

          <Switch
            label="Активен"
            {...form.getInputProps('active', { type: 'checkbox' })}
          />

          <Grid>
            <Grid.Col span={{ base: 12, xl: 6 }}>
              <Card withBorder shadow={'sm'}>
                <Group justify={'space-between'}>
                  <Text>Продукты</Text>
                  <ProductsModal
                    productAction={(product) => (
                      <AddProduct product={product} />
                    )}
                  >
                    {(open) => (
                      <Button onClick={open} variant={'light'}>
                        Добавить продукты
                      </Button>
                    )}
                  </ProductsModal>
                </Group>

                {form.errors.products && (
                  <Text mt="md" c="red" ta="center">
                    {form.errors.products}
                  </Text>
                )}

                {form.values.products.length > 0 &&
                  form.values.products.map((product, index) => (
                    <Fragment key={product.id}>
                      <Box
                        py={'sm'}
                        pb={
                          form.values.products.length - 1 !== index ? 'sm' : ''
                        }
                      >
                        <Product index={index} {...product} />
                        {product?.deleted && (
                          <Badge mt={'xs'} component={'div'} color={'red'}>
                            УДАЛЕН
                          </Badge>
                        )}
                      </Box>
                      {form.values.products.length - 1 !== index && <Divider />}
                    </Fragment>
                  ))}
              </Card>
            </Grid.Col>
            <Grid.Col span={{ base: 12, xl: 6 }}>
              <Card withBorder shadow={'sm'}>
                <Group justify={'space-between'}>
                  <Text>Сотрудники</Text>
                  <EmployeesModal
                    action={(employee) => <AddEmployee employee={employee} />}
                  >
                    {(open) => (
                      <Button onClick={open} variant={'light'}>
                        Добавить сотрудников
                      </Button>
                    )}
                  </EmployeesModal>
                </Group>

                {form.errors.employees && (
                  <Text mt="md" c="red" ta="center">
                    {form.errors.employees}
                  </Text>
                )}

                {form.values.employees.length > 0 && (
                  <Stack mt={'md'}>
                    {form.values.employees.map((employee, index) => (
                      <div key={employee.id}>
                        <Group justify={'space-between'} wrap={'nowrap'}>
                          <Group wrap={'nowrap'}>
                            <Avatar
                              size={'lg'}
                              src={employee.avatar}
                              alt={'Photo'}
                            />
                            <div>
                              <Text lineClamp={2}>{employee.name}</Text>
                              <Group gap={'xs'} mt={4}>
                                {employee.roles.map((role) => (
                                  <Badge variant={'outline'} key={'role'}>
                                    {role}
                                  </Badge>
                                ))}
                              </Group>
                            </div>
                          </Group>
                          <Group wrap={'nowrap'}>
                            <Text visibleFrom={'xs'} size={'sm'} c={'dimmed'}>
                              {employee.phone}
                            </Text>
                            <DeleteEmployee idx={index} />
                          </Group>
                        </Group>
                        <Group
                          gap={'xs'}
                          mt={
                            !matches ||
                            employee.states?.deleted ||
                            employee.states?.blocked
                              ? 'xs'
                              : ''
                          }
                          justify={'space-between'}
                        >
                          <Text hiddenFrom={'xs'} size={'sm'} c={'dimmed'}>
                            {employee.phone}
                          </Text>
                          <Group gap={'xs'}>
                            {employee.states?.deleted && (
                              <Badge color={'red'}>УДАЛЕН</Badge>
                            )}
                            {employee.states?.blocked && (
                              <Badge color={'red'}>Заблокирован</Badge>
                            )}
                          </Group>
                        </Group>
                      </div>
                    ))}
                  </Stack>
                )}
              </Card>
            </Grid.Col>
          </Grid>
        </Stack>

        <Group mt="lg" justify="flex-end">
          <Button disabled={!form.isDirty()} loading={loading} type="submit">
            {submitTitle}
          </Button>
        </Group>
      </form>
    </FormProvider>
  )
}
