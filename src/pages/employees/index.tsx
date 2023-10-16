import React, { ReactElement } from 'react'
import NextLink from 'next/link'

import { Button, Group, Title } from '@mantine/core'

import { Employees } from '@/features/employees'

import { MainLayout } from '@/shared/layout/main-layout/main-layout'

const EmployeesPage = () => {
  return (
    <>
      <Group justify="space-between" mb="lg">
        <Title order={3}>Сотрудники</Title>
        <Button href="/employees/create" component={NextLink}>
          Создать сотрудника
        </Button>
      </Group>

      <Employees />
    </>
  )
}

EmployeesPage.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}

export default EmployeesPage
