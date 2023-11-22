import { useCallback, useState } from 'react'
import { useRouter } from 'next/router'

import { Card } from '@mantine/core'
import { modals } from '@mantine/modals'
import { notifications } from '@mantine/notifications'
import { useQueryClient } from '@tanstack/react-query'
import debounce from 'lodash.debounce'

import { useDeleteEmployee, useFetchEmployees } from '../../queries/queries'
import { EmployeeFilters } from '../employee-filters/employee-filters'
import { Status, Verify } from '../../types/filters'

import { Table } from '@/shared/ui/table/table'
import { Column, Sort } from '@/shared/ui/table/types'
import { Actions } from '@/shared/ui/actions/actions'
import { ROUTES } from '@/shared/constants/routes'

export const Employees = () => {
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
  const [role, setRole] = useState<string | null>(null)

  const {
    data: employees,
    isError,
    isFetching,
  } = useFetchEmployees({
    page,
    rowsPerPage,
    sort,
    debouncedSearchValue,
    branch,
    status,
    verify,
    role,
  })

  const deleteMutation = useDeleteEmployee({
    onSuccess: (data) => {
      if (employees?.data.length === 1 && page !== 1) {
        setPage((prevState) => prevState - 1)
      } else {
        queryClient.invalidateQueries([
          'employees',
          sort,
          page,
          rowsPerPage,
          debouncedSearchValue,
          branch,
          verify,
          status,
          role,
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
    push(ROUTES.EDIT_EMPLOYEES(id))
  }

  const handleDelete = (id: number) => {
    modals.openContextModal({
      modal: 'confirmDialog',
      title: 'Подтвердите действие',
      innerProps: {
        modalBody: 'Вы действительно хотите удалить этого сотрудника?',
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
      <EmployeeFilters
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
        role={role}
        onChangeRole={(value) => {
          setRole(value)
          setPage(1)
        }}
      />
      <Table
        columns={columns}
        data={employees?.data}
        onSort={handleSort}
        sort={sort}
        total={employees?.pagination.last_page || 1}
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
