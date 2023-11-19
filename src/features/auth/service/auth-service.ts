import { http } from '@/shared/http/http'

import { User } from '../types/user'

import { ResponseWithData } from '@/shared/types/http'

export const AuthService = {
  login: async (body: { phone: string; password: string }) => {
    const { data } = await http.post<
      ResponseWithData<{
        token: string
        user: User
      }>
    >('v1/auth/login', body)

    return data
  },

  logout: () => {
    return http.post('v1/auth/logout')
  },
}
