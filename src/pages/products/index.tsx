import { ReactElement } from 'react'
import NextLink from 'next/link'

import { Button, Group, Title } from '@mantine/core'

import { Products } from '@/features/products'

import { MainLayout } from '@/shared/layout/main-layout/main-layout'
import { ROUTES } from '@/shared/constants/routes'

const ProductsPage = () => {
  return (
    <>
      <Group justify="space-between" mb="lg">
        <Title order={3}>Продукты</Title>
        <Button href={ROUTES.CREATE_PRODUCTS} component={NextLink}>
          Создать продукт
        </Button>
      </Group>

      <Products />
    </>
  )
}

ProductsPage.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}

export default ProductsPage
