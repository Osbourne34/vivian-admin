export type SemiFinishedStatus = 'sended' | 'approved' | 'completed'

export interface SemiFinished {
  id: number
  name: string
  recipe_id: string
  unit: string
  count: number
  losses: number
  remainder: number
  status: string
  created_at: string
}

export interface SemiFinishedWithDescription extends SemiFinished {
  description: string | null
}

export interface SemiFinishedMaterial {
  id: number
  name: string
  type: string
  used_count: number
}
