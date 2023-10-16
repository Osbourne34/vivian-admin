import { useCallback, useState } from 'react'

import { Card } from '@mantine/core'
import { modals } from '@mantine/modals'
import { notifications } from '@mantine/notifications'
import { useQueryClient } from '@tanstack/react-query'
import debounce from 'lodash.debounce'

import { OrientFilters } from '../orient-filters/orient-filters'
import { UpdateOrient } from '../update-orient/update-orient'
import { useDeleteOrient, useFetchOrients } from '../../queries/queries'

import { Table } from '@/shared/ui/table/table'
import { Column, Sort } from '@/shared/ui/table/types'
import { Actions } from '@/shared/ui/actions/actions'

export const Orients = () => {
  const queryClient = useQueryClient()

  const [sort, setSort] = useState<Sort>({
    orderby: '',
    sort: '',
  })

  const [page, setPage] = useState<number>(1)
  const [rowsPerPage, setRowsPerPage] = useState<string | null>('10')

  const [search, setSearch] = useState('')
  const [debouncedSearchValue, setDebouncedSearchValue] = useState('')
  const [branch, setBranch] = useState<string | null>(null)

  const {
    data: orients,
    isError,
    isFetching,
  } = useFetchOrients({
    sort,
    page,
    rowsPerPage,
    debouncedSearchValue,
    branch,
  })

  const deleteMutation = useDeleteOrient({
    onSuccess: (data) => {
      if (orients?.data.length === 1 && page !== 1) {
        setPage((prevState) => prevState - 1)
      } else {
        queryClient.invalidateQueries([
          'orients',
          sort,
          page,
          rowsPerPage,
          debouncedSearchValue,
          branch,
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
    []
  )

  const handleUpdate = (id: number) => {
    modals.open({
      title: 'Редактирование ориентира',
      children: <UpdateOrient orientId={id} />,
      size: 'lg',
      centered: true,
    })
  }

  const handleDelete = (id: number) => {
    modals.openContextModal({
      modal: 'confirmDialog',
      title: 'Подтвердите действие',
      innerProps: {
        modalBody: 'Вы действительно хотите удалить этот ориентир?',
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
      key: 'branch_id',
      title: 'Регион',
      sortable: true,
    },
    {
      key: 'action',
      title: 'Действия',
      align: 'right',
      component: (item: any) => {
        return (
          <Actions
            onUpdate={() => handleUpdate(item.id)}
            onDelete={() => handleDelete(item.id)}
          />
        )
      },
      width: 100,
    },
  ]

  return (
    <Card shadow="sm" withBorder padding={0}>
      <OrientFilters
        search={search}
        onChangeSearch={(value) => {
          debouncedSearch(value)
          setSearch(value)
        }}
        branch={branch}
        onChangeBranch={(value) => {
          setBranch(value)
          setPage(1)
        }}
      />
      <Table
        columns={columns}
        data={orients?.data}
        onSort={handleSort}
        sort={sort}
        total={orients?.pagination.last_page || 1}
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
