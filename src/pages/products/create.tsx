import { ReactElement } from 'react'
import NextLink from 'next/link'

import { Button, Card, Group, Title } from '@mantine/core'
import { IconArrowBackUp } from '@tabler/icons-react'

import { MainLayout } from '@/shared/layout/main-layout/main-layout'
import { CreateProduct } from '@/features/products'
import { ROUTES } from '@/shared/constants/routes'

const CreateProductPage = () => {
  return (
    <>
      <Group justify="space-between" mb="lg">
        <Title order={3}>Создание продукта</Title>
        <Button
          href={ROUTES.PRODUCTS}
          component={NextLink}
          rightSection={<IconArrowBackUp />}
        >
          Вернуться к списку продуктов
        </Button>
      </Group>

      <Card withBorder shadow="sm">
        <CreateProduct />
      </Card>
    </>
  )
}

CreateProductPage.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}

export default CreateProductPage
