import { useMemo } from 'react'
import { Stack } from '@mantine/core'

import { Product as ProductType } from '@/features/products'

import { useFormContext } from '../combo-form'
import { Product } from '../product/product'

interface ProductsProps {
  products: ProductType[]
  comboIdx: number
  comboId: number | string
  removableProduct?: boolean
}

export const Products = (props: ProductsProps) => {
  const { products, comboIdx, comboId, removableProduct } = props
  const form = useFormContext()

  const addProductToCombo = (product: ProductType) => {
    form.insertListItem(`combos.${comboIdx}.products`, product)
    form.clearFieldError(`combos.${comboIdx}.products`)
  }

  const removeProductToCombo = (productIdx: number) => {
    form.removeListItem(`combos.${comboIdx}.products`, productIdx)
  }

  const added = useMemo(() => {
    return (productId: number) => {
      const currentCombo = form.values.combos.find(
        (combo) => combo.id === comboId,
      )

      return currentCombo?.products.some((product) => product.id === productId)
    }
  }, [form.values.combos])

  return (
    <Stack>
      {products.map((product, index) => {
        return (
          <Product
            key={product.id}
            onAdd={addProductToCombo}
            onRemove={() => {
              removeProductToCombo(index)
            }}
            added={!!added(product.id)}
            removableProduct={removableProduct}
            {...product}
          />
        )
      })}
    </Stack>
  )
}
