import { ReactElement } from 'react'

import { Group, Title } from '@mantine/core'

import { Branches, CreateBranch } from '@/features/branches'

import { MainLayout } from '@/shared/layout/main-layout/main-layout'

const BranchesPage = () => {
  return (
    <>
      <Group justify="space-between" mb="lg">
        <Title order={3}>Регионы</Title>
        <CreateBranch />
      </Group>
      <Branches />
    </>
  )
}

BranchesPage.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}

export default BranchesPage
