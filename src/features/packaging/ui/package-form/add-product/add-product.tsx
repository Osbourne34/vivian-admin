import { ActionIcon } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'

import { Product } from '@/features/products'

import { useFormContext } from '../form-context'
import { useMemo } from 'react'

interface AddProductProps {
  product: Product
}

export const AddProduct = (props: AddProductProps) => {
  const form = useFormContext()
  const addProduct = () => {
    form.setFieldValue('product', props.product)
    form.setFieldValue('product_id', String(props.product.id))
  }

  const added = useMemo(() => {
    return Boolean(
      form.values.product && form.values.product.id === props.product.id,
    )
  }, [form.values.product, props.product])

  return (
    <ActionIcon onClick={addProduct} disabled={added}>
      <IconPlus
        style={{
          width: '70%',
          height: '70%',
        }}
        stroke={1.5}
      />
    </ActionIcon>
  )
}
