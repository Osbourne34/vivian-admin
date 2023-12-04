import { ReactNode } from 'react'

import { Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { ProductsList, Product } from '@/features/products'

interface ProductsModalProps {
  children: (open: () => void) => ReactNode
  productAction?: (product: Product) => ReactNode
}

export const ProductsModal = (props: ProductsModalProps) => {
  const { children, productAction } = props
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      {children(open)}
      <Modal
        opened={opened}
        onClose={close}
        title="Продукты"
        size="xl"
        yOffset={20}
        styles={{
          body: {
            paddingBottom: 0,
          },
        }}
      >
        <ProductsList forModal={true} productAction={productAction} />
      </Modal>
    </>
  )
}
