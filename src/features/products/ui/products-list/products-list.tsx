import { ReactNode, useCallback, useState } from 'react'

import { Alert, Center, Pagination, Skeleton, Stack, Text } from '@mantine/core'
import debounce from 'lodash.debounce'

import { ProductFilters } from '../product-filters/product-filters'
import { ProductCard } from '../product-card/product-card'
import { useFetchProducts } from '../../queries/queries'

import { Product as ProductType } from '../../types/product'

interface ProductsListProps {
  productAction?: (product: ProductType) => ReactNode
  forModal?: boolean
}

export const ProductsList = (props: ProductsListProps) => {
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
          top: props.forModal ? 60 : 0,
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
                  <ProductCard
                    key={product.id}
                    action={props.productAction && props.productAction(product)}
                    {...product}
                  />
                ))}
              </Stack>

              {products.pagination.last_page !== 1 && (
                <Center
                  px="0"
                  py={'md'}
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
    </>
  )
}
