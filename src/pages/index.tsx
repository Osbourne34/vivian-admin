import { ReactElement, useCallback, useState } from 'react'

import { Box, Card, Grid, TextInput } from '@mantine/core'

import { MainLayout } from '@/shared/layout/main-layout/main-layout'
import { Table } from '@/shared/ui/table/table'
import { http } from '@/shared/http/http'
import {
  Error,
  ResponseWithMessage,
  ResponseWithPagination,
} from '@/shared/http/types'
import { Column, Sort } from '@/shared/ui/table/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import debounce from 'lodash.debounce'
import { Actions } from '@/shared/ui/actions/actions'
import { notifications } from '@mantine/notifications'

import { modals } from '@mantine/modals'
import { useRouter } from 'next/router'

export interface Employee {
  id: number
  name: string
  phone: string
  birthday: string | null
  address: string | null
  active: boolean
}

const getEmployees = async (params: {
  page: number
  perpage: string | null
  orderby: 'asc' | 'desc' | ''
  sort: string
  search: string
  branch_id: number | null
  sortbyverified: string
  sortbyactivity: string
  role: string | null
}) => {
  const { data } = await http<ResponseWithPagination<Employee[]>>('api/users', {
    params,
  })
  return data
}

const deleteEmployee = async (id: number) => {
  const { data } = await http.delete<ResponseWithMessage>(`api/users/${id}`)

  return data
}

const Home = () => {
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
    data: employees,
    isError,
    isFetching,
  } = useQuery<ResponseWithPagination<Employee[]>, Error>({
    queryKey: ['employees', sort, page, rowsPerPage, debouncedSearchValue],
    queryFn: () =>
      getEmployees({
        branch_id: null,
        orderby: sort.orderby,
        sort: sort.sort,
        page: page,
        perpage: rowsPerPage,
        role: null,
        search: debouncedSearchValue,
        sortbyactivity: '',
        sortbyverified: '',
      }),
    onError: (error) => {
      notifications.show({
        title: 'Ошибка',
        message: error.message,
        color: 'red',
      })
    },
    retry: 0,
    keepPreviousData: true,
    staleTime: 20_000,
  })

  const deleteMutation = useMutation<ResponseWithMessage, Error, number>({
    mutationFn: deleteEmployee,
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
        ])
      }

      notifications.show({
        title: 'Успешно',
        message: data.message,
        color: 'green',
      })
    },
    onError: (error) => {
      if (error?.status === 401) {
        push('/login')
      } else {
        notifications.show({
          title: 'Ошибка',
          message: error.message,
          color: 'red',
        })
      }
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
            onUpdate={() => console.log(item)}
            onDelete={() => {
              modals.openContextModal({
                modal: 'confirmDialog',
                title: 'Подтвердите действие',
                innerProps: {
                  modalBody: 'Вы действительно хотите удалить ?',
                  onConfirm: async (modalId: string) => {
                    await deleteMutation.mutateAsync(item.id).finally(() => {
                      modals.close(modalId)
                    })
                  },
                },
              })
            }}
          />
        )
      },
      width: 100,
    },
  ]

  return (
    <Card shadow="sm" withBorder padding={0}>
      <Box p="md">
        <Grid>
          <Grid.Col span={8}>
            <TextInput
              value={search}
              onChange={(event) => {
                const value = event.target.value
                debouncedSearch(value)
                setSearch(value)
              }}
              placeholder="Поиск"
            />
          </Grid.Col>
        </Grid>
      </Box>
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

Home.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}

export default Home
