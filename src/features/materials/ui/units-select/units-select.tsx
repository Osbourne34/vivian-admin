import { Select, SelectProps } from '@mantine/core'

import { useFetchUnits } from '../../queries/queries'

interface UnitsSelectProps extends SelectProps {}

export const UnitsSelect = (props: UnitsSelectProps) => {
  const { data: materialUnits } = useFetchUnits()

  return <Select data={materialUnits} {...props} />
}
