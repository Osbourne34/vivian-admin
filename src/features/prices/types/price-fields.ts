import { EmployeeWithState, ProductWithState } from './individual-price'

export interface PriceFields {
  name: string
  active: boolean
  products: ProductWithState[]
  employees: EmployeeWithState[]
}
