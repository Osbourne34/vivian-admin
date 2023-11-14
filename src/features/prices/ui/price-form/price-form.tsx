import { Product, ProductFilters, useFetchProducts } from '@/features/products'
import { priceFormat } from '@/shared/utils/price-format'
import {
  Alert,
  Center,
  Grid,
  Group,
  Pagination,
  Skeleton,
  Stack,
  Text,
  Image,
  ScrollArea,
  TextInput,
  Switch,
  ActionIcon,
  Card,
  NumberInput,
  Button,
  MultiSelect,
  Divider,
} from '@mantine/core'
import { IconPlus, IconTrashFilled } from '@tabler/icons-react'
import { createFormContext, isNotEmpty } from '@mantine/form'
import debounce from 'lodash.debounce'
import { useCallback, useMemo, useState } from 'react'
import { ConfirmPopover } from '@/shared/ui/confirm-popover/confirm-popover'
import { useQuery } from '@tanstack/react-query'
import { Filters } from '@/shared/api/filters/filters'
import { PriceFields } from '../../types/price-fields'
import { initialValues } from './initial-values'
import { Error } from '@/shared/http/types'

const [FormProvider, useFormContext, useForm] = createFormContext<PriceFields>()

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

  const { data: employees } = useQuery(
    ['employeesForSelect'],
    Filters.getEmployees,
    {
      select: (data) => {
        const newData = data.data.map((employee) => {
          return {
            value: String(employee.id),
            label: employee.name,
          }
        })

        return {
          data: newData,
          status: data.status,
        }
      },
    },
  )

  const handleSubmit = async (data: typeof form.values) => {
    if (form.values.products.length === 0) {
      form.setFieldError('products', 'Добавьте продукты')
      return
    }

    try {
      await submit(data)
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
    <FormProvider form={form}>
      <Grid>
        <Grid.Col span={{ base: 12, xl: 5 }}>
          <ProductsList />
        </Grid.Col>

        <Grid.Col span={{ base: 12, xl: 7 }}>
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
                  data={employees?.data}
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
                <Stack mt="lg">
                  {form.values.products.map((product, index) => (
                    <div key={product.id}>
                      {index !== 0 && <Divider mb={'md'} />}
                      <Group key={product.id} justify="space-between">
                        <Group align="center" wrap="nowrap">
                          <Image
                            w={56}
                            h={56}
                            radius={'sm'}
                            fit="contain"
                            style={{
                              flex: '0 0 auto',
                            }}
                            src={product.image}
                            alt={product.name}
                          />
                          <Text size="sm" lineClamp={3}>
                            {product.name}
                          </Text>
                        </Group>
                        <Group wrap="nowrap" style={{ flexShrink: 0 }}>
                          <Group align="flex-start">
                            <NumberInput
                              w={140}
                              placeholder="Цена"
                              thousandSeparator=" "
                              allowNegative={false}
                              hideControls
                              {...form.getInputProps(`products.${index}.price`)}
                            />
                            <NumberInput
                              w={120}
                              placeholder="Поинт"
                              hideControls
                              {...form.getInputProps(`products.${index}.point`)}
                            />
                          </Group>

                          <DeleteProduct idx={index} />
                        </Group>
                      </Group>
                      {form.values.products.length - 1 === index && (
                        <Divider mt="md" />
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

const ProductsList = () => {
  const [page, setPage] = useState<number>(1)
  const [search, setSearch] = useState('')
  const [debouncedSearchValue, setDebouncedSearchValue] = useState('')
  const [category, setCategory] = useState<string | null>('')

  const {
    data: products,
    isFetching,
    error,
    isSuccess,
  } = useFetchProducts(
    {
      page,
      rowsPerPage: '10',
      sort: {
        orderby: '',
        sort: '',
      },
      debouncedSearchValue,
      category_id: category,
    },
    {
      keepPreviousData: false,
      staleTime: 10_000,
    },
  )

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setDebouncedSearchValue(value)
      setPage(1)
    }, 500),
    [],
  )

  return (
    <ScrollArea h={700} offsetScrollbars={'y'}>
      <ProductFilters
        search={search}
        onChangeSearch={(value) => {
          debouncedSearch(value)
          setSearch(value)
        }}
        category={category}
        onChangeCategory={(value) => {
          setCategory(value)
          setPage(1)
        }}
        px={0}
        pt={0}
        pb={'md'}
        style={{
          position: 'sticky',
          top: 0,
          backgroundColor: 'var(--mantine-color-body)',
          zIndex: 1,
        }}
      />

      {isFetching && (
        <Stack mb={'md'}>
          {[...Array(10).keys()].map((i) => (
            <Skeleton key={i} h={50} />
          ))}
        </Stack>
      )}
      {error && (
        <Alert title="Ошибка" color="red" variant="filled">
          {error.message}
        </Alert>
      )}
      {isSuccess && !isFetching && (
        <>
          {products.data.length > 0 ? (
            <>
              <Stack>
                {products.data.map((product) => (
                  <Group
                    key={product.id}
                    justify="space-between"
                    wrap="nowrap"
                    gap="xl"
                  >
                    <Group align="center" wrap="nowrap">
                      <Image
                        w={56}
                        h={56}
                        radius={'sm'}
                        fit="contain"
                        style={{
                          flex: '0 0 auto',
                        }}
                        src={product.image}
                        alt={product.name}
                      />
                      <Text size="sm" lineClamp={3}>
                        {product.name}
                      </Text>
                    </Group>
                    <Group wrap="nowrap">
                      <div>
                        <Text ta={'end'} style={{ whiteSpace: 'nowrap' }}>
                          {priceFormat(product.price) + ' UZC'}
                        </Text>
                        <Text
                          size="sm"
                          ta={'end'}
                          style={{ whiteSpace: 'nowrap' }}
                        >
                          {product.point} Балл
                        </Text>
                      </div>
                      <AddProduct product={product} />
                    </Group>
                  </Group>
                ))}
              </Stack>

              {products.pagination.last_page !== 1 && (
                <Center
                  px="0"
                  pt={'md'}
                  style={{
                    position: 'sticky',
                    bottom: 0,
                    backgroundColor: 'var(--mantine-color-body)',
                  }}
                >
                  <Pagination
                    value={page}
                    onChange={setPage}
                    total={products?.pagination.last_page || 1}
                  />
                </Center>
              )}
            </>
          ) : (
            <Text ta="center" size="lg">
              Ничего не найдено
            </Text>
          )}
        </>
      )}
    </ScrollArea>
  )
}

const AddProduct = ({ product }: { product: Product }) => {
  const form = useFormContext()

  const handleAddProduct = () => {
    form.insertListItem('products', {
      ...product,
      price: '',
      point: '',
    })
    form.clearFieldError('products')
  }

  const existsProduct = useMemo(
    () => form.values.products.some(({ id }) => product.id === id),
    [product, form.values.products],
  )

  return (
    <ActionIcon onClick={() => handleAddProduct()} disabled={existsProduct}>
      <IconPlus style={{ width: '70%', height: '70%' }} stroke={1.5} />
    </ActionIcon>
  )
}

const DeleteProduct = ({ idx }: { idx: number }) => {
  const form = useFormContext()

  const handleDelete = () => {
    form.removeListItem('products', idx)
  }

  return (
    <ConfirmPopover ok={handleDelete}>
      {(open) => (
        <ActionIcon onClick={open} color="red">
          <IconTrashFilled
            style={{ width: '70%', height: '70%' }}
            stroke={1.5}
          />
        </ActionIcon>
      )}
    </ConfirmPopover>
  )
}
