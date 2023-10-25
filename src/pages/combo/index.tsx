import React, { ReactElement, useCallback, useState } from 'react'

import { MainLayout } from '@/shared/layout/main-layout/main-layout'
import {
  Alert,
  Image,
  Box,
  Card,
  Center,
  Grid,
  Group,
  Loader,
  Pagination,
  Text,
  Title,
  Stack,
  ActionIcon,
  Button,
  Modal,
  NumberInput,
  Skeleton,
  Accordion,
  AccordionControl,
} from '@mantine/core'
import { useFetchProducts } from '@/features/products/queries/queries'
import { Sort } from '@/shared/ui/table/types'
import debounce from 'lodash.debounce'
import { ProductFilters } from '@/features/products/ui/product-filters/product-filters'
import { priceFormat } from '@/shared/utils/price-format'
import { IconPlus, IconMinus, IconDots } from '@tabler/icons-react'
import { useDisclosure } from '@mantine/hooks'
import { Product } from '@/features/products/types/product'
import { IconTrashFilled } from '@tabler/icons-react'

const ComboPage = () => {
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
    },
  )

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setDebouncedSearchValue(value)
      setPage(1)
    }, 500),
    [],
  )

  const [list, setList] = useState<Product[]>([])
  const [data, setData] = useState([])
  const [opened1, { open: open1, close: close1 }] = useDisclosure(false)
  const [opened2, { open: open2, close: close2 }] = useDisclosure(false)

  console.log(data)

  const [limit, setLimit] = useState<string | number>('')

  return (
    <>
      <Group justify="space-between" mb="lg">
        <Title order={3}>Комбо</Title>
      </Group>

      <Grid>
        <Grid.Col span={6}>
          <Card withBorder shadow="sm" p={0}>
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
            />
            {isFetching && (
              <Stack mb={'md'} px={'md'}>
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
              <Stack px="md">
                {products.data.map((product) => {
                  return (
                    <Group
                      key={product.id}
                      justify="space-between "
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
                        <Box>
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
                        </Box>
                        <ActionIcon
                          onClick={() => {
                            setList((prevState) => {
                              if (
                                prevState.some(({ id }) => id === product.id)
                              ) {
                                return prevState.filter(
                                  ({ id }) => id !== product.id,
                                )
                              }
                              return [...prevState, product]
                            })
                          }}
                          color={
                            list.some(({ id }) => id === product.id)
                              ? 'red'
                              : 'green'
                          }
                        >
                          {list.some(({ id }) => id === product.id) ? (
                            <IconMinus
                              style={{ width: '70%', height: '70%' }}
                              stroke={1.5}
                            />
                          ) : (
                            <IconPlus
                              style={{ width: '70%', height: '70%' }}
                              stroke={1.5}
                            />
                          )}
                        </ActionIcon>
                      </Group>
                    </Group>
                  )
                })}
              </Stack>
            )}
            {!isFetching && (
              <Center p="md">
                <Pagination
                  value={page}
                  onChange={setPage}
                  total={products?.pagination.last_page || 1}
                />
              </Center>
            )}
          </Card>
        </Grid.Col>
        <Grid.Col span={6}>
          <Card withBorder shadow="sm">
            {list.length > 0 ? (
              <Stack>
                {list.map((product) => (
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
                        loading="lazy"
                      />
                      <Text size="sm" lineClamp={3}>
                        {product.name}
                      </Text>
                    </Group>
                    <Group wrap="nowrap">
                      <Box>
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
                      </Box>
                      <ActionIcon
                        onClick={() => {
                          setList((prevState) => {
                            if (prevState.some(({ id }) => id === product.id)) {
                              return prevState.filter(
                                ({ id }) => id !== product.id,
                              )
                            }
                            return [...prevState, product]
                          })
                        }}
                        color={
                          list.some(({ id }) => id === product.id)
                            ? 'red'
                            : 'green'
                        }
                      >
                        {list.some(({ id }) => id === product.id) ? (
                          <IconMinus
                            style={{ width: '70%', height: '70%' }}
                            stroke={1.5}
                          />
                        ) : (
                          <IconPlus
                            style={{ width: '70%', height: '70%' }}
                            stroke={1.5}
                          />
                        )}
                      </ActionIcon>
                    </Group>
                  </Group>
                ))}
                <Group justify="space-between">
                  <NumberInput
                    value={limit}
                    onChange={(value) => setLimit(value)}
                    placeholder="Лимит"
                    hideControls
                  />
                  <Button
                    disabled={!limit}
                    onClick={() => {
                      setData((prevState) => {
                        return [
                          ...prevState,
                          {
                            products: list.map((product) => {
                              return {
                                id: product.id,
                              }
                            }),
                            limit,
                          },
                        ]
                      })
                      setList([])
                    }}
                  >
                    Добавить комбо
                  </Button>
                </Group>
              </Stack>
            ) : data.length > 0 ? (
              <Accordion chevronPosition="left">
                {data.map((_, index) => {
                  return (
                    <Accordion.Item key={index} value="item-1">
                      <Center>
                        <AccordionControl>Control 1</AccordionControl>
                        <ActionIcon color="red" size="lg" variant="subtle">
                          <IconTrashFilled size="1rem" />
                        </ActionIcon>
                      </Center>

                      <Accordion.Panel>Panel 1</Accordion.Panel>
                    </Accordion.Item>
                  )
                })}
              </Accordion>
            ) : (
              <Text ta={'center'}>
                Выберите один или несколько продуктов чтоб создать комбо
              </Text>
            )}
          </Card>
        </Grid.Col>
      </Grid>

      <Modal opened={opened2} onClose={close2} title="Комбинация">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Modal>
    </>
  )
}

ComboPage.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}

export default ComboPage
