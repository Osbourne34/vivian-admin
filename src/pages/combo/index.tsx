import { ReactElement } from 'react'
import NextLink from 'next/link'

import { MainLayout } from '@/shared/layout/main-layout/main-layout'
import { Group, Title, Button } from '@mantine/core'

import { Combos } from '@/features/combo'
import { ROUTES } from '@/shared/constants/routes'

const ComboPage = () => {
  return (
    <>
      <Group justify="space-between" mb="lg">
        <Title order={3}>Комбо</Title>{' '}
        <Button href={ROUTES.CREATE_COMBO} component={NextLink}>
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
