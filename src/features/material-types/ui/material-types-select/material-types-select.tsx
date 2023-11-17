import { Select, SelectProps } from '@mantine/core'

import { useFetchMaterialTypesForSelect } from '../../queries/queries'

interface MaterialTypesSelectProps extends SelectProps {}

export const MaterialTypesSelect = (props: MaterialTypesSelectProps) => {
  const { data: materialTypes } = useFetchMaterialTypesForSelect()

  return <Select data={materialTypes?.data} {...props} />
}
