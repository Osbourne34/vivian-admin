import { parentBranches } from '../utils/parent-branches'
import { BranchWithParent } from '../types/branch'
import { selectItemsDto } from '@/shared/utils/select-items-dto'

export const sortBranches = (data: BranchWithParent[]) => {
  const parents = parentBranches(data)

  let sortedBranches: BranchWithParent[] = []

  parents.forEach((parent) => {
    sortedBranches.push(parent)
    sortedBranches = sortedBranches.concat(
      data.filter((branch) => parent.id === branch.parent_id),
    )
  })

  return selectItemsDto(sortedBranches, 'id', 'name')
}