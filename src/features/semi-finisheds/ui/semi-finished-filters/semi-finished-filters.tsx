import { ChangeEvent } from 'react'

import { Box, Grid, Select, TextInput } from '@mantine/core'

import { useFetchSemiFinishedStatuses } from '../../queries/queries'
import { SemiFinishedStatus } from '@/features/semi-finisheds/types/semi-finished'
import { useQuery } from '@tanstack/react-query'
import { Filters } from '@/shared/api/filters/filters'
import { selectItemsDto } from '@/shared/utils/select-items-dto'

interface SemiFinishedFiltersProps {
  search: string
  onChangeSearch: (value: string) => void
  status: string | null
  onChangeStatus: (value: string | null) => void
  recipeId: string | null
  onChangeRecipeId: (value: string | null) => void
}

export const SemiFinishedFilters = (props: SemiFinishedFiltersProps) => {
  const {
    search,
    onChangeSearch,
    status,
    onChangeStatus,
    onChangeRecipeId,
    recipeId,
  } = props

  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    onChangeSearch(event.target.value)
  }

  const { data: statuses } = useFetchSemiFinishedStatuses()

  const { data: recipes } = useQuery({
    queryKey: ['recipes-all'],
    queryFn: Filters.getRecipes,
    select: (data) => {
      return selectItemsDto(data.data, 'id', 'name')
    },
    staleTime: 20_000,
  })

  return (
    <Box p={'md'}>
      <Grid>
        <Grid.Col span={{ base: 12, xl: 4 }}>
          <TextInput
            value={search}
            onChange={handleChangeSearch}
            placeholder={'Поиск'}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, xl: 4 }}>
          <Select
            value={status}
            onChange={onChangeStatus}
            data={statuses}
            clearable
            placeholder={'Статус'}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, xl: 4 }}>
          <Select
            value={recipeId}
            onChange={onChangeRecipeId}
            data={recipes}
            clearable
            placeholder={'Рецепт'}
          />
        </Grid.Col>
      </Grid>
    </Box>
  )
}
