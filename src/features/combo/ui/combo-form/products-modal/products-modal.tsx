import { ReactNode } from 'react'

import { Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { ProductsList } from '@/features/products'

import { AddProduct } from '../add-product/add-product'

interface ProductsModalProps {
  children: (open: () => void) => ReactNode
  comboIdx: number
  comboId: number | string
}

export const ProductsModal = (props: ProductsModalProps) => {
  const { children, comboIdx, comboId } = props
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      {children(open)}
      <Modal
        opened={opened}
        onClose={close}
        title="Выберите продукты"
        size="xl"
        yOffset={20}
        styles={{
          body: {
            paddingBottom: 0,
          },
        }}
      >
        <ProductsList
          forModal={true}
          productAction={(product) => (
            <AddProduct
              product={product}
              comboIdx={comboIdx}
              comboId={comboId}
            />
          )}
        />
      </Modal>
    </>
  )
}
