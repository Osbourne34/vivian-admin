import { Select, SelectProps } from '@mantine/core'

import { useFetchSortedBranches } from '../../queries/queries'

interface SortedBranchesSelect extends SelectProps {}

export const SortedBranchesSelect = (props: SortedBranchesSelect) => {
  const { data: branches } = useFetchSortedBranches()

  return <Select {...props} data={branches} />
}
