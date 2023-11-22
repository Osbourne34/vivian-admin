import { ReactElement } from 'react'
import NextLink from 'next/link'

import { Button, Group, Title } from '@mantine/core'

import { Materials } from '@/features/materials'

import { MainLayout } from '@/shared/layout/main-layout/main-layout'
import { ROUTES } from '@/shared/constants/routes'

const MaterialsPage = () => {
  return (
    <>
      <Group justify="space-between" mb="lg">
        <Title order={3}>Материалы</Title>
        <Button href={ROUTES.CREATE_MATERIALS} component={NextLink}>
          Создать материал
        </Button>
      </Group>

      <Materials />
    </>
  )
}

MaterialsPage.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}

export default MaterialsPage
