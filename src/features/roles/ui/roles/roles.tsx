import { useCallback, useState } from 'react'

import { Badge, Box, Card, Group, TextInput } from '@mantine/core'
import { modals } from '@mantine/modals'
import { notifications } from '@mantine/notifications'
import { useQueryClient } from '@tanstack/react-query'
import debounce from 'lodash.debounce'

import { UpdateRole } from '../update-role/update-role'
import { useDeleteRole, useFetchRoles } from '../../queries/queries'

import { Table } from '@/shared/ui/table/table'
import { Actions } from '@/shared/ui/actions/actions'
import { Column, Sort } from '@/shared/ui/table/types'

export const Roles = () => {
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
    data: roles,
    isError,
    isFetching,
  } = useFetchRoles({
    sort,
    page,
    rowsPerPage,
    debouncedSearchValue,
  })

  const deleteMutation = useDeleteRole({
    onSuccess: (data) => {
      if (roles?.data.length === 1 && page !== 1) {
        setPage((prevState) => prevState - 1)
      } else {
        queryClient.invalidateQueries([
          'roles',
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
    modals.open({
      title: 'Редактирование роли',
      children: <UpdateRole roleId={id} />,
      size: 'lg',
      centered: true,
    })
  }

  const handleDelete = (id: number) => {
    modals.openContextModal({
      modal: 'confirmDialog',
      title: 'Подтвердите действие',
      innerProps: {
        modalBody: 'Вы действительно хотите удалить эту роль?',
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
      key: 'permissions',
      title: 'Права',
      component: (item) => {
        return (
          <Group>
            {item.permissions.map(
              ({ id, name }: { name: string; id: number }) => (
                <Badge key={id} variant="outline" color="blue" size="lg">
                  {name}
                </Badge>
              ),
            )}
          </Group>
        )
      },
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
        data={roles?.data}
        onSort={handleSort}
        sort={sort}
        total={roles?.pagination.last_page || 1}
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
