import { ReactElement } from 'react'

import { Group, Title } from '@mantine/core'

import { CreateRole, Roles } from '@/features/roles'

import { MainLayout } from '@/shared/layout/main-layout/main-layout'

const RolesPage = () => {
  return (
    <>
      <Group justify="space-between" mb="lg">
        <Title order={3}>Роли</Title>
        <CreateRole />
      </Group>

      <Roles />
    </>
  )
}

RolesPage.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}

export default RolesPage
