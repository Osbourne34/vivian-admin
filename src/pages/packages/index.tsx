import { ReactElement } from 'react'
import NextLink from 'next/link'

import { Group, Button, Title } from '@mantine/core'

import { Packages } from '@/features/packaging'

import { MainLayout } from '@/shared/layout/main-layout/main-layout'
import { ROUTES } from '@/shared/constants/routes'

export const PackagesPage = () => {
  return (
    <>
      <Group justify="space-between" mb="lg">
        <Title order={3}>Упаковки</Title>
        <Button href={ROUTES.CREATE_PACKAGES} component={NextLink}>
          Создать упаковку
        </Button>
      </Group>

      <Packages />
    </>
  )
}

PackagesPage.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}

export default PackagesPage
