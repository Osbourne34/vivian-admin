import { ChangeEvent } from 'react'

import { Box, Grid, Select, TextInput } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'

import { SortedBranchesSelect } from '@/features/branches'

import { Status, Verify, statusValues, verifyValues } from './filter-values'

import { Filters } from '@/shared/api/filters/filters'

interface EmployeeFiltersProps {
  search: string
  onChangeSearch: (value: string) => void
  branch: string | null
  onChangeBranch: (value: string | null) => void
  verify: Verify | null
  onChangeVerify: (value: Verify | null) => void
  status: Status | null
  onChangeStatus: (value: Status | null) => void
  role: string | null
  onChangeRole: (value: string | null) => void
}

export const EmployeeFilters = (props: EmployeeFiltersProps) => {
  const {
    search,
    onChangeSearch,
    branch,
    onChangeBranch,
    verify,
    onChangeVerify,
    status,
    onChangeStatus,
    role,
    onChangeRole,
  } = props

  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    onChangeSearch(event.target.value)
  }

  const { data: roles } = useQuery(
    ['rolesForSelect'],
    () => Filters.getRoles('client'),
    {
      select: (data) => {
        const newData = data.data.map((role) => {
          return role.name
        })

        return {
          data: newData,
          status: data.status,
        }
      },
    }
  )

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
            value={role}
            onChange={onChangeRole}
            data={roles?.data}
            allowDeselect={false}
            clearable
            placeholder="Роль"
          />
        </Grid.Col>
      </Grid>
    </Box>
  )
}
