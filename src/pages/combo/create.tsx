import { ReactElement } from 'react'
import NextLink from 'next/link'

import { Button, Group, Title } from '@mantine/core'
import { IconArrowBackUp } from '@tabler/icons-react'

import { MainLayout } from '@/shared/layout/main-layout/main-layout'
import { CreateCombo } from '@/features/combo'
import { ROUTES } from '@/shared/constants/routes'

const CreateComboPage = () => {
  return (
    <>
      <Group justify="space-between" mb="lg">
        <Title order={3}>Создание комбинаций</Title>
        <Button
          href={ROUTES.COMBO}
          component={NextLink}
          rightSection={<IconArrowBackUp />}
        >
          Вернуться к списку комбинаций
        </Button>
      </Group>

      <CreateCombo />
    </>
  )
}

CreateComboPage.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}

export default CreateComboPage
