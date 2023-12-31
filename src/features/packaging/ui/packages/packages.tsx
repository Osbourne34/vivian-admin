import { useCallback, useState } from 'react'
import { useRouter } from 'next/router'

import { Box, Card, TextInput } from '@mantine/core'
import { modals } from '@mantine/modals'
import { notifications } from '@mantine/notifications'
import { useQueryClient } from '@tanstack/react-query'
import debounce from 'lodash.debounce'

import { useDeletePackage, useFetchPackages } from '../../queries/queries'
import { ViewPackage } from './view-package/view-package'

import { Table } from '@/shared/ui/table/table'
import { Column, Sort } from '@/shared/ui/table/types'
import { Actions } from '@/shared/ui/actions/actions'
import { ROUTES } from '@/shared/constants/routes'

export const Packages = () => {
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
    data: packages,
    isFetching,
    isError,
  } = useFetchPackages({
    page,
    sort,
    search: debouncedSearchValue,
    perpage: rowsPerPage,
  })

  const deleteMutation = useDeletePackage({
    onSuccess: (data) => {
      if (packages?.data.length === 1 && page !== 1) {
        setPage((prevState) => prevState - 1)
      } else {
        queryClient.invalidateQueries([
          'packages',
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
    push(ROUTES.EDIT_PACKAGES(id))
  }

  const handleDelete = (id: number) => {
    modals.openContextModal({
      modal: 'confirmDialog',
      title: 'Подтвердите действие',
      innerProps: {
        modalBody: 'Вы действительно хотите удалить эту упаковку?',
        onConfirm: async (modalId: string) => {
          await deleteMutation.mutateAsync(id).finally(() => {
            modals.close(modalId)
          })
        },
      },
    })
  }

  const handleViewPackage = (id: number) => {
    modals.open({
      title: 'Просмотр упаковки',
      children: <ViewPackage packageId={id} />,
      size: 'xl',
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
          <Actions
            onUpdate={() => handleUpdate(item.id)}
            onDelete={() => handleDelete(item.id)}
            onPreview={() => handleViewPackage(item.id)}
          />
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
        data={packages?.data}
        onSort={handleSort}
        sort={sort}
        total={packages?.pagination.last_page || 1}
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
