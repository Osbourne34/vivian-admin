import React, { ReactElement } from 'react'
import NextLink from 'next/link'

import { Button, Card, Group, Title } from '@mantine/core'
import { IconArrowBackUp } from '@tabler/icons-react'

import { UpdateClient } from '@/features/clients'

import { MainLayout } from '@/shared/layout/main-layout/main-layout'

const ClientUpdatePage = () => {
  return (
    <div>
      <Group justify="space-between" mb="lg">
        <Title order={3}>Редактирование клиента</Title>

        <Button
          href="/clients"
          component={NextLink}
          rightSection={<IconArrowBackUp />}
        >
          Вернуться к списку клиентов
        </Button>
      </Group>

      <Card withBorder shadow="sm">
        <UpdateClient />
      </Card>
    </div>
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
