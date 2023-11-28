import { ReactElement } from 'react'
import NextLink from 'next/link'

import { Group, Button, Title } from '@mantine/core'
import { IconArrowBackUp } from '@tabler/icons-react'

import { CreatePackage } from '@/features/packaging'

import { MainLayout } from '@/shared/layout/main-layout/main-layout'
import { ROUTES } from '@/shared/constants/routes'

export const CreatePackagePage = () => {
  return (
    <>
      <Group justify="space-between" mb="lg">
        <Title order={3}>Создание упаковки</Title>
        <Button
          href={ROUTES.PACKAGES}
          component={NextLink}
          rightSection={<IconArrowBackUp />}
        >
          Вернуться к списку упаковок
        </Button>
      </Group>

      <CreatePackage />
    </>
  )
}

CreatePackagePage.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}

export default CreatePackagePage
