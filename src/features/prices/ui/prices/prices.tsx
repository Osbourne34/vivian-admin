import { useCallback, useState } from 'react'
import { useRouter } from 'next/router'

import { ActionIcon, Box, Card, Group, TextInput } from '@mantine/core'
import { modals } from '@mantine/modals'
import { notifications } from '@mantine/notifications'
import { IconEye } from '@tabler/icons-react'
import { useQueryClient } from '@tanstack/react-query'
import debounce from 'lodash.debounce'

import { useDeletePrice, useFetchPrices } from '../../queries/queries'
import { ViewPrice } from './view-price/view-price'

import { Table } from '@/shared/ui/table/table'
import { Actions } from '@/shared/ui/actions/actions'

import { Column, Sort } from '@/shared/ui/table/types'

export const Prices = () => {
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

  const {
    data: prices,
    isFetching,
    isError,
  } = useFetchPrices({
    debouncedSearchValue,
    page,
    rowsPerPage,
    sort,
  })

  const deleteMutation = useDeletePrice({
    onSuccess: (data) => {
      if (prices?.data.length === 1 && page !== 1) {
        setPage((prevState) => prevState - 1)
      } else {
        queryClient.invalidateQueries([
          'individual-prices',
          sort,
          page,
          rowsPerPage,
          debouncedSearchValue,
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
    push(`prices/edit/${id}`)
  }

  const handleDelete = (id: number) => {
    modals.openContextModal({
      modal: 'confirmDialog',
      title: 'Подтвердите действие',
      innerProps: {
        modalBody: 'Вы действительно хотите удалить эту индивидуальную цену?',
        onConfirm: async (modalId: string) => {
          await deleteMutation.mutateAsync(id).finally(() => {
            modals.close(modalId)
          })
        },
      },
    })
  }

  const handleViewPrice = (id: number) => {
    modals.open({
      title: 'Просмотр индивидуальной цены',
      children: <ViewPrice priceId={id} />,
      size: 1000,
      xOffset: 16,
      yOffset: 32,
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
      key: 'name',
      title: 'Название',
      sortable: true,
    },
    {
      key: 'created_at',
      title: 'Дата создания',
      sortable: true,
    },
    {
      key: 'active',
      title: 'Активен',
      sortable: true,
      boolean: true,
    },
    {
      key: 'action',
      title: 'Действия',
      align: 'right',
      component: (item: any) => {
        return (
          <Group gap="xs" justify="flex-end">
            <Actions
              onUpdate={() => handleUpdate(item.id)}
              onDelete={() => handleDelete(item.id)}
              onPreview={() => handleViewPrice(item.id)}
            />
          </Group>
        )
      },
      width: 150,
    },
  ]

  return (
    <Card shadow="sm" withBorder padding={0}>
      <Box p="md">
        <TextInput
          value={search}
          onChange={(event) => {
            const value = event.target.value
            debouncedSearch(value)
            setSearch(value)
          }}
          placeholder="Поиск"
        />
      </Box>
      <Table
        columns={columns}
        data={prices?.data}
        onSort={handleSort}
        sort={sort}
        total={prices?.pagination.last_page || 1}
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
