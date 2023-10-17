import React, { ReactElement } from 'react'
import NextLink from 'next/link'

import { Button, Group, Title } from '@mantine/core'

import { Clients } from '@/features/clients'

import { MainLayout } from '@/shared/layout/main-layout/main-layout'

const ClientsPage = () => {
  return (
    <>
      <Group justify="space-between" mb="lg">
        <Title order={3}>Клиенты</Title>
        <Button href="/clients/create" component={NextLink}>
          Создать клиента
        </Button>
      </Group>

      <Clients />
    </>
  )
}

ClientsPage.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}

export default ClientsPage
