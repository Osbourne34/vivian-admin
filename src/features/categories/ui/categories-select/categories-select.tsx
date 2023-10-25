import { Select, SelectProps } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'

import { Filters } from '@/shared/api/filters/filters'

interface CategoriesSelectProps extends SelectProps {}

export const CategoriesSelect = (props: CategoriesSelectProps) => {
  const { data: categories } = useQuery(
    ['allCategories'],
    Filters.getCategories,
    {
      select: (data) => {
        const newData = data.data.map((category) => {
          return {
            value: String(category.id),
            label: category.name,
          }
        })

        return {
          data: newData,
          status: data.status,
        }
      },
    },
  )

  return <Select data={categories?.data} {...props} />
}
