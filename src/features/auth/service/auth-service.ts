import { http } from '@/shared/http/http'

import { User } from '../types/user'

import { ResponseWithData } from '@/shared/http/types'

export const AuthService = {
  login: async (body: { phone: string; password: string }) => {
    const { data } = await http.post<
      ResponseWithData<{
        token: string
        user: User
      }>
    >('api/auth/login', body)

    return data
  },

  logout: () => {
    return http.post('api/auth/logout')
  },
}
