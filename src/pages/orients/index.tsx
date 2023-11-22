import { ReactElement } from 'react'

import { Group, Title } from '@mantine/core'

import { CreateOrient, Orients } from '@/features/orients'

import { MainLayout } from '@/shared/layout/main-layout/main-layout'

const OrientsPage = () => {
  return (
    <>
      <Group justify="space-between" mb="lg">
        <Title order={3}>Ориентиры</Title>
        <CreateOrient />
      </Group>

      <Orients />
    </>
  )
}

OrientsPage.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}

export default OrientsPage
