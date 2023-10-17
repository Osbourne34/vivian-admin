import { ReactElement } from 'react'

import { Group, Title } from '@mantine/core'

import { Categories, CreateCategory } from '@/features/categories'

import { MainLayout } from '@/shared/layout/main-layout/main-layout'

const CategoriesPage = () => {
  return (
    <>
      <Group justify="space-between" mb="lg">
        <Title order={3}>Категорий</Title>
        <CreateCategory />
      </Group>

      <Categories />
    </>
  )
}

CategoriesPage.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}

export default CategoriesPage
