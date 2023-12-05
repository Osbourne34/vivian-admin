import { Select, SelectProps } from '@mantine/core'

import { useFetchProductUnits } from '../../queries/queries'

interface ProductUnitsSelectProps extends SelectProps {}

export const ProductUnitsSelect = (props: ProductUnitsSelectProps) => {
  const { data: productUnits } = useFetchProductUnits()

  return <Select data={productUnits} {...props} />
}
