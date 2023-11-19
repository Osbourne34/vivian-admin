import { BranchWithParent } from '../types/branch'

export const parentBranches = (data: BranchWithParent[]) => {
  return data.filter(
    (branch) => branch.parent_id === 0 && branch.parent_name === null,
  )
}
