import { Dayjs } from 'dayjs'

export interface ClientFields {
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
  manager_id: string
}
