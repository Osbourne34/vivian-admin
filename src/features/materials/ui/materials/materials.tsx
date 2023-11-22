import { useCallback, useState } from 'react'
import { useRouter } from 'next/router'

import { Card } from '@mantine/core'
import { modals } from '@mantine/modals'
import { notifications } from '@mantine/notifications'
import { useQueryClient } from '@tanstack/react-query'
import debounce from 'lodash.debounce'

import { MaterialFilters } from '../material-filters/material-filters'
import { useDeleteMaterial, useFetchMaterials } from '../../queries/queries'

import { Table } from '@/shared/ui/table/table'
import { Actions } from '@/shared/ui/actions/actions'
import { Column, Sort } from '@/shared/ui/table/types'

import { pricePrint } from '@/shared/utils/price-print'
import { ROUTES } from '@/shared/constants/routes'

export const Materials = () => {
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
  const [typeId, setTypeId] = useState<string | null>(null)

  const {
    data: materials,
    isError,
    isFetching,
  } = useFetchMaterials({
    page,
    search: debouncedSearchValue,
    type_id: typeId,
    perpage: rowsPerPage,
    sort,
  })

  const deleteMutation = useDeleteMaterial({
    onSuccess: (data) => {
      if (materials?.data.length === 1 && page !== 1) {
        setPage((prevState) => prevState - 1)
      } else {
        queryClient.invalidateQueries([
          'materials',
          page,
          rowsPerPage,
          search,
          sort,
          typeId,
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
    push(ROUTES.EDIT_MATERIALS(id))
  }

  const handleDelete = (id: number) => {
    modals.openContextModal({
      modal: 'confirmDialog',
      title: 'Подтвердите действие',
      innerProps: {
        modalBody: 'Вы действительно хотите удалить этот материал?',
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
      key: 'name',
      title: 'Название',
      sortable: true,
    },
    {
      key: 'type_id',
      title: 'Тип материала',
      sortable: true,
    },
    {
      key: 'unit',
      title: 'Ед. измерения',
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
      key: 'count',
      title: 'Количество',
      sortable: true,
    },
    {
      key: 'losses',
      title: 'Потери',
    },
    {
      key: 'transport_costs',
      title: 'Транспортные расходы',
      valueGetter: (item) => {
        return pricePrint(item.price)
      },
      sortable: true,
    },
    {
      key: 'remainder',
      title: 'Остаток',
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
      <MaterialFilters
        search={search}
        onChangeSearch={(value) => {
          debouncedSearch(value)
          setSearch(value)
        }}
        type_id={typeId}
        onChangeTypeId={(value) => {
          setTypeId(value)
          setPage(1)
        }}
      />
      <Table
        columns={columns}
        data={materials?.data}
        onSort={handleSort}
        sort={sort}
        total={materials?.pagination.last_page || 1}
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
