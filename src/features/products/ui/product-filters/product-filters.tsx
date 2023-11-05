import { ChangeEvent } from 'react'

import { Box, BoxComponentProps, Grid, TextInput } from '@mantine/core'

import { CategoriesSelect } from '@/features/categories'

interface ProductFiltersProps extends BoxComponentProps {
  search: string
  onChangeSearch: (value: string) => void
  category: string | null
  onChangeCategory: (value: string | null) => void
}

export const ProductFilters = (props: ProductFiltersProps) => {
  const { category, onChangeCategory, search, onChangeSearch, ...other } = props

  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    onChangeSearch(event.target.value)
  }

  return (
    <Box p="md" {...other}>
      <Grid>
        <Grid.Col span={{ base: 12, md: 7, xl: 9 }}>
          <TextInput
            value={search}
            onChange={handleChangeSearch}
            placeholder="Поиск"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 5, xl: 3 }}>
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
