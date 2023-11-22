import { ReactElement } from 'react'
import NextLink from 'next/link'

import { Button, Card, Group, Title } from '@mantine/core'
import { IconArrowBackUp } from '@tabler/icons-react'

import { UpdateClient } from '@/features/clients'

import { MainLayout } from '@/shared/layout/main-layout/main-layout'
import { ROUTES } from '@/shared/constants/routes'

const ClientUpdatePage = () => {
  return (
    <>
      <Group justify="space-between" mb="lg">
        <Title order={3}>Редактирование клиента</Title>

        <Button
          href={ROUTES.CLIENTS}
          component={NextLink}
          rightSection={<IconArrowBackUp />}
        >
          Вернуться к списку клиентов
        </Button>
      </Group>

      <Card withBorder shadow="sm">
        <UpdateClient />
      </Card>
    </>
  )
}

ClientUpdatePage.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}

export const getServerSideProps = async () => {
  return {
    props: {},
  }
}

export default ClientUpdatePage
