import { http } from '@/shared/http/http'

import { Employee, EmployeeDetail } from '../types/employee'

import {
  ResponseWithData,
  ResponseWithMessage,
  ResponseWithPagination,
} from '@/shared/http/types'

export const EmployeesService = {
  createEmployee: async (body: FormData) => {
    const { data } = await http.post<ResponseWithMessage>('/v1/users', body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return data
  },

  getEmployees: async (params: {
    page: number
    perpage: string | null
    orderby: 'asc' | 'desc' | ''
    sort: string
    search: string
    branch_id: string | null
    sortbyverified: string | null
    sortbyactivity: string | null
    role: string | null
  }) => {
    const { data } = await http<ResponseWithPagination<Employee[]>>(
      'v1/users',
      { params },
    )

    return data
  },

  getEmployee: async (id: number) => {
    const { data } = await http<ResponseWithData<EmployeeDetail>>(
      `v1/users/${id}/edit`,
    )

    return data
  },

  updateEmployee: async ({ id, body }: { id: number; body: FormData }) => {
    const { data } = await http.post<ResponseWithMessage>(
      `v1/users/${id}`,
      body,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )

    return data
  },

  deleteEmployee: async (id: number) => {
    const { data } = await http.delete<ResponseWithMessage>(`v1/users/${id}`)

    return data
  },
}
