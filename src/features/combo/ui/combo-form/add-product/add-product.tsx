import { useMemo } from 'react'

import { ActionIcon } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'

import { Product } from '@/features/products'

import { useFormContext } from '../form-context'

interface AddProductProps {
  comboIdx: number
  comboId: number | string
  product: Product
}

export const AddProduct = (props: AddProductProps) => {
  const { product, comboIdx, comboId } = props

  const form = useFormContext()
  const addProductToCombo = () => {
    form.insertListItem(`combos.${comboIdx}.products`, product)
    form.clearFieldError(`combos.${comboIdx}.products`)
  }

  const added = useMemo(() => {
    return () => {
      const currentCombo = form.values.combos.find(
        (combo) => combo.id === comboId,
      )

      return currentCombo?.products.some(({ id }) => id === product.id)
    }
  }, [form.values.combos, product.id])

  return (
    <ActionIcon
      onClick={addProductToCombo}
      disabled={added()}
      variant="outline"
    >
      <IconPlus style={{ width: '70%', height: '70%' }} stroke={1.5} />
    </ActionIcon>
  )
}
