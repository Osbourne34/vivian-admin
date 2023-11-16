import { ReactElement } from 'react'

import { Group, Title } from '@mantine/core'

import { CreateMaterialType, MaterialTypes } from '@/features/material-types'

import { MainLayout } from '@/shared/layout/main-layout/main-layout'

const MaterialTypesPage = () => {
  return (
    <>
      <Group justify="space-between" mb="lg">
        <Title order={3}>Типы материалов</Title>

        <CreateMaterialType />
      </Group>

      <MaterialTypes />
    </>
  )
}

MaterialTypesPage.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}

export default MaterialTypesPage
