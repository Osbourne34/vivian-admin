import { Select, SelectProps } from '@mantine/core'

import { useFetchRecipeUnits } from '../../queries/queries'

interface RecipeUnitsSelectProps extends SelectProps {}

export const RecipeUnitsSelect = (props: RecipeUnitsSelectProps) => {
  const { data } = useFetchRecipeUnits()

  return <Select data={data} {...props} />
}
