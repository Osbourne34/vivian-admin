import { ReactElement } from 'react'
import NextLink from 'next/link'

import { Button, Card, Group, Title } from '@mantine/core'
import { IconArrowBackUp } from '@tabler/icons-react'

import { CreateMaterial } from '@/features/materials'

import { MainLayout } from '@/shared/layout/main-layout/main-layout'
import { ROUTES } from '@/shared/constants/routes'

const MaterialCreatePage = () => {
  return (
    <>
      <Group justify="space-between" mb="lg">
        <Title order={3}>Создание материала</Title>
        <Button
          href={ROUTES.MATERIALS}
          component={NextLink}
          rightSection={<IconArrowBackUp />}
        >
          Вернуться к списку материалов
        </Button>
      </Group>

      <Card withBorder shadow={'sm'}>
        <CreateMaterial />
      </Card>
    </>
  )
}

MaterialCreatePage.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}

export default MaterialCreatePage
