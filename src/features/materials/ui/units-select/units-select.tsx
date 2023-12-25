import { Select, SelectProps } from '@mantine/core'

import { useFetchMaterialUnits } from '../../queries/queries'

interface UnitsSelectProps extends SelectProps {}

export const UnitsSelect = (props: UnitsSelectProps) => {
  const { data: materialUnits } = useFetchMaterialUnits()

  return <Select data={materialUnits} {...props} />
}
