import { ChangeEvent } from 'react'

import { Box, BoxProps, Grid, TextInput } from '@mantine/core'

import { MaterialTypesSelect } from '@/features/material-types'

interface MaterialFiltersProps extends BoxProps {
  search: string
  onChangeSearch: (value: string) => void
  type_id: string | null
  onChangeTypeId: (value: string | null) => void
}

export const MaterialFilters = (props: MaterialFiltersProps) => {
  const { onChangeTypeId, type_id, onChangeSearch, search } = props

  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    onChangeSearch(event.target.value)
  }

  return (
    <Box p={'md'} {...props}>
      <Grid>
        <Grid.Col span={{ base: 12, xl: 8 }}>
          <TextInput
            value={search}
            onChange={handleChangeSearch}
            placeholder={'Поиск'}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, xl: 4 }}>
          <MaterialTypesSelect
            placeholder={'Тип материала'}
            value={type_id}
            onChange={onChangeTypeId}
            searchable
            clearable
          />
        </Grid.Col>
      </Grid>
    </Box>
  )
}
