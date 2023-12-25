import { ReactElement } from 'react'
import NextLink from 'next/link'

import { Button, Group, Title } from '@mantine/core'

import { SemiFinisheds } from '@/features/semi-finisheds'

import { MainLayout } from '@/shared/layout/main-layout/main-layout'
import { ROUTES } from '@/shared/constants/routes'

const SemifinishedsPage = () => {
  return (
    <>
      <Group justify="space-between" mb="lg">
        <Title order={3}>Полуфабрикаты</Title>
        <Button href={ROUTES.CREATE_SEMIFINISHEDS} component={NextLink}>
          Создать полуфабрикат
        </Button>
      </Group>

      <SemiFinisheds />
    </>
  )
}

SemifinishedsPage.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}

export default SemifinishedsPage
