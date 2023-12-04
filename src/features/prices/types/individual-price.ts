import { EmployeeDetail } from '@/features/employees'
import { Product } from '@/features/products'

export interface ProductWithState extends Product {
  deleted: boolean
}

export type IndividualPriceEmployee = Omit<
  EmployeeDetail,
  'birthday' | 'address' | 'active' | 'branch_id' | 'description'
>

export interface EmployeeWithState extends IndividualPriceEmployee {
  states: {
    deleted: boolean
    blocked: boolean
  }
}

export interface IndividualPrice {
  id: number
  name: string
  created_at: string
  active: boolean
}

export interface IndividualPriceShow {
  products: ProductWithState[]
  employees: EmployeeWithState[]
}

export interface IndividualPriceEdit
  extends Omit<IndividualPrice, 'created_at'> {
  products: ProductWithState[]
  employees: EmployeeWithState[]
}
