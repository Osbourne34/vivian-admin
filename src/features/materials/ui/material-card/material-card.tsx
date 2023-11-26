import { ReactNode } from 'react'

import { Card, Group, Text } from '@mantine/core'

import { Material } from '../../types/material'

interface MaterialCardProps extends Material {
  action?: ReactNode
}

export const MaterialCard = (props: MaterialCardProps) => {
  return (
    <Card withBorder shadow={'sm'} py={'xs'}>
      <Group justify={'space-between'} wrap={'nowrap'}>
        <div>
          <Text lineClamp={2}>{props.name}</Text>
          <Text size={'sm'} c={'dimmed'}>
            Тип: {props.type_id}
          </Text>
          <Text size={'sm'} c={'dimmed'}>
            Ед.изм: {props.unit}
          </Text>
        </div>
        {props.action}
      </Group>
    </Card>
  )
}
