import { ReactElement } from 'react'
import NextLink from 'next/link'

import { Button, Group, Title } from '@mantine/core'
import { IconArrowBackUp } from '@tabler/icons-react'

import { CreatePrice } from '@/features/prices'

import { MainLayout } from '@/shared/layout/main-layout/main-layout'

const CreatePricePage = () => {
  return (
    <>
      <Group justify="space-between" mb="lg">
        <Title order={3}>Создание индивидуальной цены</Title>
        <Button
          href="/prices"
          component={NextLink}
          rightSection={<IconArrowBackUp />}
        >
          Вернуться к списку индивидуальных цен
        </Button>
      </Group>

      <CreatePrice />
    </>
  )
}

CreatePricePage.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}

export default CreatePricePage
