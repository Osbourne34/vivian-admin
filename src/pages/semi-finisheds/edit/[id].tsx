import { UpdateSemiFinished } from '@/features/semi-finisheds'
import { ROUTES } from '@/shared/constants/routes'
import { MainLayout } from '@/shared/layout/main-layout/main-layout'
import { Button, Group, Title } from '@mantine/core'
import { IconArrowBackUp } from '@tabler/icons-react'

import NextLink from 'next/link'
import { ReactElement } from 'react'

const UpdateSemiFinishedPage = () => {
  return (
    <>
      <Group justify={'space-between'} mb={'lg'}>
        <Title order={3}>Редактирование полуфабриката</Title>

        <Button
          href={ROUTES.SEMIFINISHEDS}
          component={NextLink}
          rightSection={<IconArrowBackUp />}
        >
          Вернуться к списку полуфабрикатов
        </Button>
      </Group>

      <UpdateSemiFinished />
    </>
  )
}

export const getServerSideProps = () => {
  return {
    props: {},
  }
}

UpdateSemiFinishedPage.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}

export default UpdateSemiFinishedPage
