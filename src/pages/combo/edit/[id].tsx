import { ReactElement } from 'react'
import NextLink from 'next/link'
import { MainLayout } from '@/shared/layout/main-layout/main-layout'
import { Button, Group, Title } from '@mantine/core'
import { IconArrowBackUp } from '@tabler/icons-react'
import { UpdateCombo } from '@/features/combo'
import { ROUTES } from '@/shared/constants/routes'

const UpdateComboPage = () => {
  return (
    <>
      <Group justify="space-between" mb="lg">
        <Title order={3}>Редактирование комбинаций</Title>

        <Button
          href={ROUTES.COMBO}
          component={NextLink}
          rightSection={<IconArrowBackUp />}
        >
          Вернуться к списку комбинаций
        </Button>
      </Group>

      <UpdateCombo />
    </>
  )
}

export const getServerSideProps = () => {
  return {
    props: {},
  }
}

UpdateComboPage.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}

export default UpdateComboPage
