import { ReactElement } from 'react'
import NextLink from 'next/link'

import { Button, Card, Group, Title } from '@mantine/core'
import { IconArrowBackUp } from '@tabler/icons-react'

import { UpdateProduct } from '@/features/products'

import { MainLayout } from '@/shared/layout/main-layout/main-layout'
import { ROUTES } from '@/shared/constants/routes'

const UpdateProductPage = () => {
  return (
    <>
      <Group justify="space-between" mb="lg">
        <Title order={3}>Редактирование продукта</Title>
        <Button
          href={ROUTES.PRODUCTS}
          component={NextLink}
          rightSection={<IconArrowBackUp />}
        >
          Вернуться к списку продуктов
        </Button>
      </Group>

      <Card withBorder shadow="sm">
        <UpdateProduct />
      </Card>
    </>
  )
}

UpdateProductPage.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}

export const getServerSideProps = async () => {
  return {
    props: {},
  }
}

export default UpdateProductPage
