import { ReactElement } from 'react'
import NextLink from 'next/link'

import { Button, Card, Group, Title } from '@mantine/core'
import { IconArrowBackUp } from '@tabler/icons-react'

import { CreateEmployee } from '@/features/employees'

import { MainLayout } from '@/shared/layout/main-layout/main-layout'
import { ROUTES } from '@/shared/constants/routes'

const EmployeeCreatePage = () => {
  return (
    <>
      <Group justify="space-between" mb="lg">
        <Title order={3}>Создание сотрудника</Title>
        <Button
          href={ROUTES.EMPLOYEES}
          component={NextLink}
          rightSection={<IconArrowBackUp />}
        >
          Вернуться к списку сотрудников
        </Button>
      </Group>

      <Card withBorder shadow="sm">
        <CreateEmployee />
      </Card>
    </>
  )
}

EmployeeCreatePage.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}

export default EmployeeCreatePage
