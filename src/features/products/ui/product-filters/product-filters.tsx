import { ChangeEvent } from 'react'

import { Box, Grid, Select, TextInput } from '@mantine/core'

import { useFetchCategories } from '@/features/categories/queries/queries'

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

  const { data: categories } = useFetchCategories(
    {
      debouncedSearchValue: '',
      page: 1,
      rowsPerPage: '50',
      sort: {
        orderby: '',
        sort: '',
      },
    },
    {
      //@ts-ignore
      select: (data) => {
        const newData = data.data.map((category) => {
          return {
            value: String(category.id),
            label: category.name,
          }
        })

        return {
          data: newData,
          pagination: data.pagination,
          status: data.status,
        }
      },
    },
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
          <Select
            value={category}
            onChange={onChangeCategory}
            placeholder="Категория"
            clearable
            data={categories?.data as []}
          />
        </Grid.Col>
      </Grid>
    </Box>
  )
}
