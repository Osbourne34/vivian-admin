import { Select, SelectProps } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'

import { Filters } from '@/shared/api/filters/filters'
import { selectItemsDto } from '@/shared/utils/select-items-dto'

interface CategoriesSelectProps extends SelectProps {}

export const CategoriesSelect = (props: CategoriesSelectProps) => {
  const { data: categories } = useQuery(
    ['allCategories'],
    Filters.getCategories,
    {
      select: (data) => {
        return selectItemsDto(data.data, 'id', 'name')
      },
    },
  )

  return <Select data={categories} {...props} />
}
