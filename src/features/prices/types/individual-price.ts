import { EmployeeDetail } from '@/features/employees'
import { Product } from '@/features/products'

type Employee = Omit<
  EmployeeDetail,
  'birthday' | 'address' | 'active' | 'branch_id' | 'description'
>

export interface IndividualPrice {
  id: number
  name: string
  created_at: string
  active: boolean
}

export interface IndividualPriceShow {
  products: Product[]
  employees: Employee[]
}

export interface IndividualPriceEdit
  extends Omit<IndividualPrice, 'created_at'> {
  products: Product[]
  employees: string[]
}
