import { http } from '@/shared/http/http'
import { ResponseWithData } from '@/shared/types/http'
import {
  BranchWithParent,
  BranchWithParentAndChildrends,
} from '@/features/branches'
import { IndividualPriceEmployee } from '@/features/prices'

export const Filters = {
  getBranches: async () => {
    const { data } = await http<ResponseWithData<BranchWithParent[]>>(
      'v1/filter/branches',
      {
        params: {
          tree: 0,
        },
      },
    )

    return data
  },

  getBranchesTree: async () => {
    const { data } = await http<
      ResponseWithData<BranchWithParentAndChildrends[]>
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
    const { data } = await http<ResponseWithData<IndividualPriceEmployee[]>>(
      'v1/filter/employees',
      {
        params: {
          roles: 'manager,deliveryman',
        },
      },
    )

    return data
  },

  getMaterialTypes: async () => {
    const { data } = await http<
      ResponseWithData<{ id: number; name: string }[]>
    >('v1/filter/material/types')

    return data
  },

  getMaterialUnits: async () => {
    const { data } = await http<
      ResponseWithData<{ title: string; value: string }[]>
    >('v1/filter/material/units')

    return data
  },
}
