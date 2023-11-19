import { ReactNode } from 'react'

import { ComboboxItem } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'

import { Filters } from '@/shared/api/filters/filters'
import { selectItemsDto } from '@/shared/utils/select-items-dto'

interface ManagersSelectProps {
  children: (managers?: ComboboxItem[]) => ReactNode
}

export const ManagersSelect = (props: ManagersSelectProps) => {
  const { children } = props

  const { data: managers } = useQuery(['managers'], Filters.getManagers, {
    select: (data) => {
      return selectItemsDto(data.data, 'id', 'name')
    },
  })

  return <>{children(managers)}</>
}
