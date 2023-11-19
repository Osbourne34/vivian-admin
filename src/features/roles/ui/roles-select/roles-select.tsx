import { ReactNode } from 'react'

import { ComboboxItem } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'

import { Filters } from '@/shared/api/filters/filters'
import { selectItemsDto } from '@/shared/utils/select-items-dto'

interface RolesSelectProps {
  children: (roles?: ComboboxItem[]) => ReactNode
}

export const RolesSelect = (props: RolesSelectProps) => {
  const { children } = props

  const { data: roles } = useQuery(
    ['rolesForSelect'],
    () => Filters.getRoles('client'),
    {
      select: (data) => {
        return selectItemsDto(data.data, 'id', 'name')
      },
    },
  )

  return <>{children(roles)}</>
}
