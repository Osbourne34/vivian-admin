import { useCallback, useState } from 'react'
import { useRouter } from 'next/router'

import { Card } from '@mantine/core'
import { modals } from '@mantine/modals'
import { notifications } from '@mantine/notifications'
import { useQueryClient } from '@tanstack/react-query'
import debounce from 'lodash.debounce'

import { ClientFilters } from '../client-filters/client-filters'
import { useDeleteClient, useFetchClients } from '../../queries/queries'
import { Status, Verify } from '../../types/filters'

import { Table } from '@/shared/ui/table/table'
import { Actions } from '@/shared/ui/actions/actions'
import { Column, Sort } from '@/shared/ui/table/types'
import { ROUTES } from '@/shared/constants/routes'

export const Clients = () => {
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
  const [branch, setBranch] = useState<string | null>(null)
  const [verify, setVerify] = useState<Verify | null>(null)
  const [status, setStatus] = useState<Status | null>(null)
  const [manager, setManager] = useState<string | null>(null)

  const {
    data: clients,
    isError,
    isFetching,
  } = useFetchClients({
    page,
    rowsPerPage,
    sort,
    debouncedSearchValue,
    branch,
    status,
    verify,
    manager,
  })

  const deleteMutation = useDeleteClient({
    onSuccess: (data) => {
      if (clients?.data.length === 1 && page !== 1) {
        setPage((prevState) => prevState - 1)
      } else {
        queryClient.invalidateQueries([
          'clients',
          sort,
          page,
          rowsPerPage,
          debouncedSearchValue,
          branch,
          manager,
          verify,
          status,
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
    push(ROUTES.EDIT_CLIENT(id))
  }

  const handleDelete = (id: number) => {
    modals.openContextModal({
      modal: 'confirmDialog',
      title: 'Подтвердите действие',
      innerProps: {
        modalBody: 'Вы действительно хотите удалить этого клиента?',
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
      title: 'Имя',
      sortable: true,
    },
    {
      key: 'phone',
      title: 'Номер телефона',
      sortable: true,
    },
    {
      key: 'birthday',
      title: 'День рождения',
      sortable: true,
    },
    {
      key: 'address',
      title: 'Адресс',
      sortable: true,
    },
    {
      key: 'manager_id',
      title: 'Менеджер',
      sortable: true,
    },
    {
      key: 'active',
      title: 'Активен',
      boolean: true,
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
      <ClientFilters
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
        verify={verify}
        onChangeVerify={(value) => {
          setVerify(value)
          setPage(1)
        }}
        status={status}
        onChangeStatus={(value) => {
          setStatus(value)
          setPage(1)
        }}
        manager={manager}
        onChangeManager={(value) => {
          setManager(value)
          setPage(1)
        }}
      />
      <Table
        columns={columns}
        data={clients?.data}
        onSort={handleSort}
        sort={sort}
        total={clients?.pagination.last_page || 1}
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
