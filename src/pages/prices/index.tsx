import { ReactElement } from 'react'
import NextLink from 'next/link'

import { Button, Group, Title } from '@mantine/core'

import { MainLayout } from '@/shared/layout/main-layout/main-layout'
import { Prices } from '@/features/prices'

const PricesPage = () => {
  return (
    <>
      <Group justify="space-between" mb="lg">
        <Title order={3}>Индивидаульные цены</Title>
        <Button component={NextLink} href="/prices/create">
          Создать индивидаульную цену
        </Button>
      </Group>

      <Prices />
    </>
  )
}

PricesPage.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}

export default PricesPage
