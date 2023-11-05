import React, { ReactElement } from 'react'
import NextLink from 'next/link'

import { MainLayout } from '@/shared/layout/main-layout/main-layout'
import { Group, Title, Button } from '@mantine/core'

import { Combos } from '@/features/combo'

const ComboPage = () => {
  return (
    <>
      <Group justify="space-between" mb="lg">
        <Title order={3}>Комбо</Title>{' '}
        <Button href="/combo/create" component={NextLink}>
          Создать комбинацию
        </Button>
      </Group>

      <Combos />
    </>
  )
}

ComboPage.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}

export default ComboPage

const ProductsList = () => {}
