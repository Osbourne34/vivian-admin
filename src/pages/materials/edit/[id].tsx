import { ReactElement } from 'react'
import NextLink from 'next/link'

import { Button, Card, Group, Title } from '@mantine/core'
import { IconArrowBackUp } from '@tabler/icons-react'

import { UpdateMaterial } from '@/features/materials'

import { MainLayout } from '@/shared/layout/main-layout/main-layout'
import { ROUTES } from '@/shared/constants/routes'

const MaterialUpdatePage = () => {
  return (
    <>
      <Group justify="space-between" mb="lg">
        <Title order={3}>Редактирование материала</Title>

        <Button
          href={ROUTES.MATERIALS}
          component={NextLink}
          rightSection={<IconArrowBackUp />}
        >
          Вернуться к списку материалов
        </Button>
      </Group>

      <UpdateMaterial />
    </>
  )
}

MaterialUpdatePage.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}

export const getServerSideProps = async () => {
  return {
    props: {},
  }
}

export default MaterialUpdatePage
