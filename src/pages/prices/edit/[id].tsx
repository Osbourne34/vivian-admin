import { ReactElement } from 'react'
import NextLink from 'next/link'

import { Button, Group, Title } from '@mantine/core'
import { IconArrowBackUp } from '@tabler/icons-react'

import { UpdatePrice } from '@/features/prices'

import { MainLayout } from '@/shared/layout/main-layout/main-layout'
import { ROUTES } from '@/shared/constants/routes'

const UpdatePricePage = () => {
  return (
    <>
      <Group justify="space-between" mb="lg">
        <Title order={3}>Редактирование индивидуальной цены</Title>

        <Button
          href={ROUTES.PRICES}
          component={NextLink}
          rightSection={<IconArrowBackUp />}
        >
          Вернуться к списку индивидуальных цен
        </Button>
      </Group>

      <UpdatePrice />
    </>
  )
}

export const getServerSideProps = () => {
  return {
    props: {},
  }
}

UpdatePricePage.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}

export default UpdatePricePage
