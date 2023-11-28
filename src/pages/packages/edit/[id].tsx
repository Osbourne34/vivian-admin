import { ReactElement } from 'react'
import NextLink from 'next/link'

import { Button, Group, Title } from '@mantine/core'
import { IconArrowBackUp } from '@tabler/icons-react'

import { UpdatePackage } from '@/features/packaging'

import { MainLayout } from '@/shared/layout/main-layout/main-layout'
import { ROUTES } from '@/shared/constants/routes'

const UpdatePackagePage = () => {
  return (
    <>
      <Group justify={'space-between'} mb={'lg'}>
        <Title order={3}>Редактирование упаковки</Title>

        <Button
          href={ROUTES.PACKAGES}
          component={NextLink}
          rightSection={<IconArrowBackUp />}
        >
          Вернуться к списку упаковок
        </Button>
      </Group>

      <UpdatePackage />
    </>
  )
}

export const getServerSideProps = () => {
  return {
    props: {},
  }
}

UpdatePackagePage.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}

export default UpdatePackagePage
