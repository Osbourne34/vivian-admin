import { http } from '@/shared/http/http'
import { ResponseWithData } from '@/shared/http/types'

export const Filters = {
  getBranches: async () => {
    const { data } = await http<
      ResponseWithData<
        {
          id: number
          name: string
          parent_id: number
          parent_name: string | null
          warehouse: boolean
        }[]
      >
    >('v1/filter/branches', {
      params: {
        tree: 0,
      },
    })

    return data
  },

  getBranchesTree: async () => {
    const { data } = await http<
      ResponseWithData<
        {
          id: number
          name: string
          parent_id: number
          warehouse: boolean
          childrens: { id: number; name: string; parent_id: number }[]
        }[]
      >
    >('v1/filter/branches', {
      params: {
        tree: 1,
      },
    })

    return data
  },

  getRoles: async (withOutRole: string) => {
    const { data } = await http<
      ResponseWithData<{ id: number; name: string }[]>
    >('v1/filter/roles', {
      params: {
        withOutRole,
      },
    })

    return data
  },

  getOrients: async (branch_id?: number) => {
    const { data } = await http<
      ResponseWithData<{ id: number; name: string }[]>
    >('v1/filter/orients', {
      params: {
        branch_id,
      },
    })

    return data
  },

  getManagers: async () => {
    const { data } =
      await http<ResponseWithData<{ id: number; name: string }[]>>(
        'v1/filter/managers',
      )

    return data
  },

  getPermissions: async () => {
    const { data } = await http<
      ResponseWithData<{ id: number; name: string }[]>
    >('v1/filter/permissions')

    return data
  },

  getCategories: async () => {
    const { data } = await http<
      ResponseWithData<{ id: number; name: string }[]>
    >('v1/filter/categories')

    return data
  },

  getManagersAndDeliveryman: async () => {
    const { data } = await http<
      ResponseWithData<{ id: number; name: string }[]>
    >('v1/filter/employees', {
      params: {
        roles: 'manager,deliveryman',
      },
    })

    return data
  },
}
