import { ChangeEvent } from 'react'

import { Box, Grid, Select, TextInput } from '@mantine/core'

import { SortedBranchesSelect } from '@/features/branches'
import { RolesSelect } from '@/features/roles'

import { statusValues, verifyValues } from './filter-values'
import { Status, Verify } from '../../types/filters'

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

  const handleChangeVerify = (value: string | null) => {
    onChangeVerify(value as Verify)
  }

  const handleChangeStatus = (value: string | null) => {
    onChangeStatus(value as Status)
  }

  return (
    <Box p="md">
      <Grid>
        <Grid.Col span={{ base: 12, xl: 8 }}>
          <TextInput
            value={search}
            onChange={handleChangeSearch}
            placeholder="Поиск"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, xl: 4 }}>
          <SortedBranchesSelect
            value={branch}
            onChange={onChangeBranch}
            allowDeselect={false}
            clearable
            placeholder="Регион"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, xl: 4 }}>
          <Select
            value={verify}
            onChange={handleChangeVerify}
            data={verifyValues}
            allowDeselect={false}
            clearable
            placeholder="Верификация"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, xl: 4 }}>
          <Select
            value={status}
            onChange={handleChangeStatus}
            data={statusValues}
            allowDeselect={false}
            clearable
            placeholder="Статус"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, xl: 4 }}>
          <RolesSelect>
            {(roles) => (
              <Select
                value={role}
                onChange={onChangeRole}
                data={roles}
                allowDeselect={false}
                clearable
                placeholder="Роль"
              />
            )}
          </RolesSelect>
        </Grid.Col>
      </Grid>
    </Box>
  )
}
