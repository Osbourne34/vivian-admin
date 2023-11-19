export interface Branch {
  id: number
  name: string
  warehouse: boolean
  childrens?: Branch[]
}

export interface BranchDetail extends Omit<Branch, 'childrens'> {
  parent_id: number
}

export interface BranchWithParent extends Omit<Branch, 'childrens'> {
  parent_id: 0 | number
  parent_name: string | null
}

export interface BranchWithParentAndChildrends extends Branch {
  parent_id: 0 | number
}
