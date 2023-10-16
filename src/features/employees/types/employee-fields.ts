import { Dayjs } from 'dayjs'

export interface EmployeeFields {
  name: string
  phone: string
  birthday: Dayjs | string | null
  address: string
  description: string
  password: string
  password_confirmation: string
  active: boolean
  branch_id: string
  avatar: File | null
  roles: string[]
}
