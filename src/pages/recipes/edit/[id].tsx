import { ReactElement } from 'react'
import NextLink from 'next/link'

import { Button, Group, Title } from '@mantine/core'
import { IconArrowBackUp } from '@tabler/icons-react'

import { UpdateRecipe } from '@/features/recipes'

import { MainLayout } from '@/shared/layout/main-layout/main-layout'
import { ROUTES } from '@/shared/constants/routes'

const UpdateRecipePage = () => {
  return (
    <>
      <Group justify={'space-between'} mb={'lg'}>
        <Title order={3}>Редактирование рецепта</Title>

        <Button
          href={ROUTES.RECIPES}
          component={NextLink}
          rightSection={<IconArrowBackUp />}
        >
          Вернуться к списку рецептов
        </Button>
      </Group>

      <UpdateRecipe />
    </>
  )
}

export const getServerSideProps = () => {
  return {
    props: {},
  }
}

UpdateRecipePage.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}

export default UpdateRecipePage
