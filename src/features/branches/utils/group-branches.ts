import { BranchWithParentAndChildrends } from '../types/branch'
import { selectItemsDto } from '@/shared/utils/select-items-dto'

export const groupBranches = (data: BranchWithParentAndChildrends[]) => {
  const filtered = data.filter((item) => {
    if (item.childrens && item.childrens!.length > 0) return true
  })

  return filtered.map((item) => {
    return {
      group: item.name,
      items: selectItemsDto(item.childrens!, 'id', 'name'),
    }
  })
}
