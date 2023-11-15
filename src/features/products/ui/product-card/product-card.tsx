import { ReactNode } from 'react'

import { Avatar, Group, Text } from '@mantine/core'

import { Product } from '../../types/product'
import { priceFormat } from '@/shared/utils/price-format'

interface ProductCardProps extends Product {
  action?: ReactNode
}

export const ProductCard = (product: ProductCardProps) => {
  return (
    <Group justify="space-between" wrap="nowrap" gap="xl">
      <Group align="center" wrap="nowrap">
        <Avatar
          size={'lg'}
          radius={'sm'}
          src={product.image}
          alt={product.name}
        />
        <Text size="sm" lineClamp={3}>
          {product.name}
        </Text>
      </Group>
      <Group wrap="nowrap">
        <div>
          <Text ta={'end'} style={{ whiteSpace: 'nowrap' }}>
            {priceFormat(product.price) + ' UZC'}
          </Text>
          <Text size="sm" ta={'end'} style={{ whiteSpace: 'nowrap' }}>
            {product.point} Балл
          </Text>
        </div>
        {product.action}
      </Group>
    </Group>
  )
}
