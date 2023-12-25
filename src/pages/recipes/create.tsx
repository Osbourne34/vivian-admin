import { ReactElement } from 'react'
import NextLink from 'next/link'

import { Group, Button, Title } from '@mantine/core'
import { IconArrowBackUp } from '@tabler/icons-react'

import { CreateRecipe } from '@/features/recipes'

import { MainLayout } from '@/shared/layout/main-layout/main-layout'
import { ROUTES } from '@/shared/constants/routes'

const CreateRecipePage = () => {
  return (
    <>
      <Group justify="space-between" mb="lg">
        <Title order={3}>Создание рецепта</Title>
        <Button
          href={ROUTES.RECIPES}
          component={NextLink}
          rightSection={<IconArrowBackUp />}
        >
          Вернуться к списку рецептов
        </Button>
      </Group>

      <CreateRecipe />
    </>
  )
}

CreateRecipePage.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}

export default CreateRecipePage
