import React, { useCallback, useState } from 'react'

import {
  Alert,
  ScrollArea,
  Skeleton,
  Stack,
  Center,
  Pagination,
  Modal,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import debounce from 'lodash.debounce'

import { useFetchProducts, ProductFilters } from '@/features/products'

import { Products } from '../products/products'

interface ProductsModalProps {
  children: (open: () => void) => JSX.Element
  comboIdx: number
  comboId: number | string
}

export const ProductsModal = (props: ProductsModalProps) => {
  const { children, comboIdx, comboId } = props
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      {children(open)}
      <Modal
        opened={opened}
        onClose={close}
        title="Выберите продукты"
        size="xl"
      >
        <ProductsList comboIdx={comboIdx} comboId={comboId} />
      </Modal>
    </>
  )
}

const ProductsList = ({
  comboIdx,
  comboId,
}: {
  comboIdx: number
  comboId: number | string
}) => {
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
    <>
      <ProductFilters
        p={'0'}
        mb="lg"
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
          <ScrollArea h={600} offsetScrollbars>
            <Products
              products={products.data}
              comboIdx={comboIdx}
              comboId={comboId}
            />
          </ScrollArea>
          <Center mt="lg">
            <Pagination
              value={page}
              onChange={setPage}
              total={products?.pagination.last_page || 1}
            />
          </Center>
        </>
      )}
    </>
  )
}
