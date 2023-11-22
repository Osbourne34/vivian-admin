import { useCallback, useState } from 'react'
import { useRouter } from 'next/router'

import { Image, Box, Card } from '@mantine/core'
import { modals } from '@mantine/modals'
import { notifications } from '@mantine/notifications'
import { useQueryClient } from '@tanstack/react-query'
import debounce from 'lodash.debounce'

import { ProductFilters } from '../product-filters/product-filters'
import { useDeleteProduct, useFetchProducts } from '../../queries/queries'

import { Table } from '@/shared/ui/table/table'
import { Column, Sort } from '@/shared/ui/table/types'
import { Actions } from '@/shared/ui/actions/actions'
import { pricePrint } from '@/shared/utils/price-print'
import { ROUTES } from '@/shared/constants/routes'

export const Products = () => {
  const { push } = useRouter()
  const queryClient = useQueryClient()

  const [sort, setSort] = useState<Sort>({
    orderby: '',
    sort: '',
  })

  const [page, setPage] = useState<number>(1)
  const [rowsPerPage, setRowsPerPage] = useState<string | null>('10')

  const [search, setSearch] = useState('')
  const [debouncedSearchValue, setDebouncedSearchValue] = useState('')
  const [category, setCategory] = useState<string | null>('')

  const {
    data: products,
    isError,
    isFetching,
  } = useFetchProducts({
    page,
    rowsPerPage,
    sort,
    debouncedSearchValue,
    category_id: category,
  })

  const deleteMutation = useDeleteProduct({
    onSuccess: (data) => {
      if (products?.data.length === 1 && page !== 1) {
        setPage((prevState) => prevState - 1)
      } else {
        queryClient.invalidateQueries([
          'products',
          category,
          debouncedSearchValue,
          page,
          rowsPerPage,
          sort,
        ])
      }

      notifications.show({
        title: 'Успешно',
        message: data.message,
        color: 'green',
      })
    },
  })

  const handleSort = (sort: Sort) => {
    setSort(sort)
  }

  const handleChangePage = (value: number) => {
    setPage(value)
  }

  const handleChangeRowsPerPage = (value: string | null) => {
    setRowsPerPage(value)
    setPage(1)
  }

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setDebouncedSearchValue(value)
      setPage(1)
    }, 500),
    [],
  )

  const handleUpdate = (id: number) => {
    push(ROUTES.EDIT_PRODUCTS(id))
  }

  const handleDelete = (id: number) => {
    modals.openContextModal({
      modal: 'confirmDialog',
      title: 'Подтвердите действие',
      innerProps: {
        modalBody: 'Вы действительно хотите удалить этот продукт?',
        onConfirm: async (modalId: string) => {
          await deleteMutation.mutateAsync(id).finally(() => {
            modals.close(modalId)
          })
        },
      },
    })
  }

  const columns: Column[] = [
    {
      key: 'id',
      title: 'ID',
      sortable: true,
      width: 80,
    },
    {
      key: 'image',
      title: 'Изображение',
      component: (item) => {
        return (
          <Box py="xs">
            <Image
              w={56}
              h={56}
              radius={'sm'}
              fit="contain"
              src={item.image}
              alt={'product-card image'}
              loading="lazy"
            />
          </Box>
        )
      },
    },
    {
      key: 'name',
      title: 'Название',
      sortable: true,
    },
    {
      key: 'price',
      title: 'Цена',
      valueGetter: (item) => {
        return pricePrint(item.price)
      },
      sortable: true,
    },
    {
      key: 'point',
      title: 'Поинт',
      sortable: true,
    },
    {
      key: 'action',
      title: 'Действия',
      align: 'right',
      component: (item: any) => {
        return (
          <Actions
            onDelete={() => handleDelete(item.id)}
            onUpdate={() => handleUpdate(item.id)}
          />
        )
      },
      width: 100,
    },
  ]

  return (
    <Card shadow="sm" withBorder padding={0}>
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
      <Table
        columns={columns}
        data={products?.data}
        onSort={handleSort}
        sort={sort}
        total={products?.pagination.last_page || 1}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        isLoading={isFetching}
        isError={isError}
      />
    </Card>
  )
}
