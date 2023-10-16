import React, { ChangeEvent } from 'react'

import { Box, Grid, TextInput } from '@mantine/core'

import { SortedBranchesSelect } from '@/features/branches'

interface OrientFiltersProps {
  search: string
  onChangeSearch: (value: string) => void
  branch: string | null
  onChangeBranch: (value: string | null) => void
}

export const OrientFilters = (props: OrientFiltersProps) => {
  const { search, onChangeSearch, branch, onChangeBranch } = props

  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    onChangeSearch(event.target.value)
  }

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
            placeholder="Регион"
            clearable
            value={branch}
            onChange={onChangeBranch}
          />
        </Grid.Col>
      </Grid>
    </Box>
  )
}
