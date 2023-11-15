import {
  ActionIcon,
  Card,
  Group,
  NumberInput,
  Stack,
  Text,
  Tooltip,
} from '@mantine/core'
import { IconPlus, IconTrashFilled } from '@tabler/icons-react'

import { ProductCard } from '@/features/products'

import { useFormContext } from '../form-context'
import { ProductsModal } from '../products-modal/products-modal'
import { DeleteProduct } from '../delete-product/delete-product'

import { ComboItem } from '../../../types/combo-fields'

import { ConfirmPopover } from '@/shared/ui/confirm-popover/confirm-popover'

interface ComboProps extends ComboItem {
  comboIdx: number
  removable: boolean
}

export const Combo = (props: ComboProps) => {
  const { id, limit, products, comboIdx, removable } = props

  const form = useFormContext()

  const deleteCombo = () => {
    form.removeListItem('combos', comboIdx)
  }

  return (
    <Card withBorder shadow="sm" h={'100%'}>
      <Group justify="space-between" mb="md">
        <Text size="xl" fw={500}>
          Комбо
        </Text>
        <Group gap="sm">
          <ProductsModal comboIdx={comboIdx} comboId={id}>
            {(open) => (
              <Tooltip label="Добавить продукты">
                <ActionIcon onClick={open} size="lg">
                  <IconPlus
                    style={{ width: '70%', height: '70%' }}
                    stroke={1.5}
                  />
                </ActionIcon>
              </Tooltip>
            )}
          </ProductsModal>
          <ConfirmPopover ok={deleteCombo}>
            {(open) => (
              <Tooltip label="Удалить комбо">
                <ActionIcon
                  onClick={open}
                  color="red"
                  size="lg"
                  variant="outline"
                  disabled={!removable}
                >
                  <IconTrashFilled
                    style={{ width: '70%', height: '70%' }}
                    stroke={1.5}
                  />
                </ActionIcon>
              </Tooltip>
            )}
          </ConfirmPopover>
        </Group>
      </Group>
      <Stack>
        <NumberInput
          label="Лимит"
          hideControls
          withAsterisk
          allowNegative={false}
          {...form.getInputProps(`combos.${comboIdx}.limit`)}
        />
        <Text>Продукты:</Text>
        {form.errors[`combos.${comboIdx}.products`] && (
          <Text size="xl" c="red" ta="center">
            {form.errors[`combos.${comboIdx}.products`]}
          </Text>
        )}

        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            action={<DeleteProduct productIdx={index} comboIdx={comboIdx} />}
            {...product}
          />
        ))}
      </Stack>
    </Card>
  )
}
