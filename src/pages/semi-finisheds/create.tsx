import { Group, Button, Title } from '@mantine/core'
import { ROUTES } from '@/shared/constants/routes'
import NextLink from 'next/link'
import { IconArrowBackUp } from '@tabler/icons-react'
import { ReactElement } from 'react'
import { MainLayout } from '@/shared/layout/main-layout/main-layout'
import { CreateSemiFinished } from '@/features/semi-finisheds'

const CreateSemifinishedsPage = () => {
  return (
    <>
      <Group justify="space-between" mb="lg">
        <Title order={3}>Создание полуфабриката</Title>
        <Button
          href={ROUTES.SEMIFINISHEDS}
          component={NextLink}
          rightSection={<IconArrowBackUp />}
        >
          Вернуться к списку полуфабрикатов
        </Button>
      </Group>

      <CreateSemiFinished />
    </>
  )
}

CreateSemifinishedsPage.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}

export default CreateSemifinishedsPage
