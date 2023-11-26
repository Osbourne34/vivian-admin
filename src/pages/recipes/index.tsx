import { ReactElement } from 'react'
import NextLink from 'next/link'

import { Group, Button, Title } from '@mantine/core'

import { Recipes } from '@/features/recipes'

import { MainLayout } from '@/shared/layout/main-layout/main-layout'
import { ROUTES } from '@/shared/constants/routes'

export const RecipesPage = () => {
  return (
    <>
      <Group justify="space-between" mb="lg">
        <Title order={3}>Рецепты</Title>
        <Button href={ROUTES.CREATE_RECIPES} component={NextLink}>
          Создать рецепт
        </Button>
      </Group>

      <Recipes />
    </>
  )
}

RecipesPage.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}

export default RecipesPage
