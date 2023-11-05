import { ActionIcon, Group, Image, Text } from '@mantine/core'
import { IconPlus, IconTrashFilled } from '@tabler/icons-react'

import { Product as ProductType } from '@/features/products'

import { ConfirmPopover } from '@/shared/ui/confirm-popover/confirm-popover'
import { priceFormat } from '@/shared/utils/price-format'

interface ProductProps extends ProductType {
  onAdd: (product: ProductType) => void
  onRemove: () => void
  added: boolean
  removableProduct?: boolean
}

export const Product = (props: ProductProps) => {
  const {
    id,
    image,
    name,
    point,
    price,
    onAdd,
    onRemove,
    added,
    removableProduct,
  } = props

  return (
    <Group justify="space-between" wrap="nowrap" gap="xl">
      <Group align="center" wrap="nowrap">
        <Image
          w={56}
          h={56}
          radius={'sm'}
          fit="contain"
          style={{
            flex: '0 0 auto',
          }}
          src={image}
          alt={name}
        />
        <Text size="sm" lineClamp={3}>
          {name}
        </Text>
      </Group>
      <Group wrap="nowrap">
        <div>
          <Text ta={'end'} style={{ whiteSpace: 'nowrap' }}>
            {priceFormat(price) + ' UZC'}
          </Text>
          <Text size="sm" ta={'end'} style={{ whiteSpace: 'nowrap' }}>
            {point} Балл
          </Text>
        </div>

        {!removableProduct && (
          <ActionIcon
            disabled={added}
            onClick={() =>
              onAdd({
                id,
                image,
                name,
                point,
                price,
              })
            }
            variant="outline"
          >
            <IconPlus style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
        )}

        {added && removableProduct && (
          <ConfirmPopover ok={onRemove}>
            {(open) => (
              <ActionIcon
                onClick={() => {
                  open()
                }}
                variant="outline"
                color="red"
              >
                <IconTrashFilled
                  style={{ width: '70%', height: '70%' }}
                  stroke={1.5}
                />
              </ActionIcon>
            )}
          </ConfirmPopover>
        )}
      </Group>
    </Group>
  )
}
