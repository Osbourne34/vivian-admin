import { useRouter } from 'next/router'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import { Column, Sort } from '@/shared/ui/table/types'
import debounce from 'lodash.debounce'
import {
  useDeleteSemiFinished,
  useFetchSemiFinisheds,
} from '../../queries/queries'
import { Actions } from '@/shared/ui/actions/actions'
import { Card } from '@mantine/core'
import { Table } from '@/shared/ui/table/table'
import { SemiFinishedFilters } from '../semi-finished-filters/semi-finished-filters'
import { SemiFinishedStatus } from '@/features/semi-finisheds/types/semi-finished'
import { notifications } from '@mantine/notifications'
import { modals } from '@mantine/modals'
import { ViewSemiFinished } from '@/features/semi-finisheds/ui/semi-finisheds/view-semi-finished/view-semi-finished'
import { ROUTES } from '@/shared/constants/routes'

export const SemiFinisheds = () => {
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
  const [recipeId, setRecipeId] = useState<string | null>(null)
  const [status, setStatus] = useState<SemiFinishedStatus | null>(null)

  const {
    data: semiFinisheds,
    isFetching,
    isError,
  } = useFetchSemiFinisheds({
    page,
    perpage: rowsPerPage,
    search: debouncedSearchValue,
    sort,
    recipe_id: recipeId,
    status,
  })

  const deleteMutation = useDeleteSemiFinished({
    onSuccess: (data) => {
      if (semiFinisheds?.data.length === 1 && page !== 1) {
        setPage((prevState) => prevState - 1)
      } else {
        queryClient.invalidateQueries([
          'semiFinisheds',
          page,
          rowsPerPage,
          status,
          sort,
          recipeId,
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
    push(ROUTES.EDIT_SEMIFINISHEDS(id))
  }

  const handleDelete = (id: number) => {
    modals.openContextModal({
      modal: 'confirmDialog',
      title: 'Подтвердите действие',
      innerProps: {
        modalBody: 'Вы действительно хотите удалить этот полуфабрикат?',
        onConfirm: async (modalId: string) => {
          await deleteMutation.mutateAsync(id).finally(() => {
            modals.close(modalId)
          })
        },
      },
    })
  }

  const handleViewSemiFinished = (id: number) => {
    modals.open({
      title: 'Просмотр полуфабриката',
      children: <ViewSemiFinished semiFinishedId={id} />,
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
      key: 'recipe_id',
      title: 'Рецепт',
      sortable: true,
    },
    {
      key: 'unit',
      title: 'Ед.измерения',
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
      key: 'remainder',
      title: 'Остаток',
    },
    {
      key: 'status',
      title: 'Статус',
      sortable: true,
    },
    {
      key: 'created_at',
      title: 'Дата создания',
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
            onPreview={() => handleViewSemiFinished(item.id)}
          />
        )
      },
      width: 150,
    },
  ]

  return (
    <Card shadow="sm" withBorder padding={0}>
      <SemiFinishedFilters
        search={search}
        onChangeSearch={(value: string) => {
          setSearch(value)
          debouncedSearch(value)
        }}
        status={status}
        onChangeStatus={(status: string | null) => {
          setStatus(status as SemiFinishedStatus)
          setPage(1)
        }}
        recipeId={recipeId}
        onChangeRecipeId={(recipeId) => {
          setRecipeId(recipeId)
          setPage(1)
        }}
      />
      <Table
        columns={columns}
        data={semiFinisheds?.data}
        onSort={handleSort}
        sort={sort}
        total={semiFinisheds?.pagination.last_page || 1}
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
