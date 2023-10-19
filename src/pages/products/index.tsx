import React, { ReactElement } from 'react'
import NextLink from 'next/link'

import { Button, Group, Title } from '@mantine/core'

import { Products } from '@/features/products'

import { MainLayout } from '@/shared/layout/main-layout/main-layout'

const ProductsPage = () => {
  return (
    <>
      <Group justify="space-between" mb="lg">
        <Title order={3}>Продукты</Title>
        <Button href="/products/create" component={NextLink}>
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
