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
        <Grid.Col span={{ base: 12, md: 7, xl: 9 }}>
          <TextInput
            value={search}
            onChange={handleChangeSearch}
            placeholder="Поиск"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 5, xl: 3 }}>
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
