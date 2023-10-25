import { ChangeEvent } from 'react'

import { Box, Grid, TextInput } from '@mantine/core'

import { CategoriesSelect } from '@/features/categories'

interface ProductFiltersProps {
  search: string
  onChangeSearch: (value: string) => void
  category: string | null
  onChangeCategory: (value: string | null) => void
}

export const ProductFilters = (props: ProductFiltersProps) => {
  const { category, onChangeCategory, search, onChangeSearch } = props

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
          <CategoriesSelect
            placeholder="Категория"
            value={category}
            onChange={onChangeCategory}
            searchable
            clearable
          />
        </Grid.Col>
      </Grid>
    </Box>
  )
}
