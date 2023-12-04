import { useMemo } from 'react'

import { ActionIcon } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'

import { Product } from '@/features/products'

import { useFormContext } from '../form-context'

interface AddProductProps {
  product: Product
}

export const AddProduct = ({ product }: AddProductProps) => {
  const form = useFormContext()

  const handleAddProduct = () => {
    form.insertListItem('products', {
      ...product,
    })
    form.clearFieldError('products')
  }

  const existsProduct = useMemo(
    () => form.values.products.some(({ id }) => product.id === id),
    [product, form.values.products],
  )

  return (
    <ActionIcon onClick={() => handleAddProduct()} disabled={existsProduct}>
      <IconPlus style={{ width: '70%', height: '70%' }} stroke={1.5} />
    </ActionIcon>
  )
}
