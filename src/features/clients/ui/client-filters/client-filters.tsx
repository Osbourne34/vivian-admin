import { ChangeEvent } from 'react'

import { Box, Grid, Select, TextInput } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'

import { SortedBranchesSelect } from '@/features/branches'

import { Status, Verify } from '../../types/filters'
import { statusValues, verifyValues } from './filter-values'

import { Filters } from '@/shared/api/filters/filters'

interface ClientFiltersProps {
  search: string
  onChangeSearch: (value: string) => void
  branch: string | null
  onChangeBranch: (value: string | null) => void
  verify: Verify | null
  onChangeVerify: (value: Verify | null) => void
  status: Status | null
  onChangeStatus: (value: Status | null) => void
  manager: string | null
  onChangeManager: (value: string | null) => void
}

export const ClientFilters = (props: ClientFiltersProps) => {
  const {
    search,
    onChangeSearch,
    branch,
    onChangeBranch,
    verify,
    onChangeVerify,
    status,
    onChangeStatus,
    manager,
    onChangeManager,
  } = props

  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    onChangeSearch(event.target.value)
  }

  const { data: managers } = useQuery(['managers'], Filters.getManagers, {
    select: (data) => {
      const newData = data.data.map((manager) => {
        return {
          value: String(manager.id),
          label: manager.name,
        }
      })

      return {
        status: data.status,
        data: newData,
      }
    },
  })

  return (
    <Box p="md">
      <Grid>
        <Grid.Col span={8}>
          <TextInput
            value={search}
            onChange={handleChangeSearch}
            placeholder="Поиск"
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <SortedBranchesSelect
            value={branch}
            onChange={onChangeBranch}
            allowDeselect={false}
            clearable
            placeholder="Регион"
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <Select
            value={verify}
            onChange={onChangeVerify}
            data={verifyValues}
            allowDeselect={false}
            clearable
            placeholder="Верификация"
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <Select
            value={status}
            onChange={onChangeStatus}
            data={statusValues}
            allowDeselect={false}
            clearable
            placeholder="Статус"
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <Select
            value={manager}
            onChange={onChangeManager}
            data={managers?.data}
            allowDeselect={false}
            clearable
            placeholder="Менеджер"
          />
        </Grid.Col>
      </Grid>
    </Box>
  )
}