import { ReactElement } from 'react'
import NextLink from 'next/link'

import { Button, Card, Group, Title } from '@mantine/core'
import { IconArrowBackUp } from '@tabler/icons-react'

import { CreateClient } from '@/features/clients'

import { MainLayout } from '@/shared/layout/main-layout/main-layout'

const ClientCreatePage = () => {
  return (
    <div>
      <Group justify="space-between" mb="lg">
        <Title order={3}>Создание клиента</Title>
        <Button
          href="/clients"
          component={NextLink}
          rightSection={<IconArrowBackUp />}
        >
          Вернуться к списку клиентов
        </Button>
      </Group>

      <Card withBorder shadow="sm">
        <CreateClient />
      </Card>
    </div>
  )
}

ClientCreatePage.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}

export default ClientCreatePage
