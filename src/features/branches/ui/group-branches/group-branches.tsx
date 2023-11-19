import { Select, SelectProps } from '@mantine/core'

import { useFetchGroupBranches } from '../../queries/queries'

interface GroupBranchesSelectProps extends SelectProps {}

export const GroupBranchesSelect = (props: GroupBranchesSelectProps) => {
  const { data: groupBranches } = useFetchGroupBranches()

  return <Select {...props} data={groupBranches} />
}
