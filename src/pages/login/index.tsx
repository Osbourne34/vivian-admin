import { ReactElement } from 'react'
import { Card, Title } from '@mantine/core'

import { LoginForm } from '@/features/auth'

import { AuthLayout } from '@/shared/layout/auth-layout/auth-layout'

const LoginPage = () => {
  return (
    <Card shadow="sm">
      <Title order={2} ta={'center'} mb="md">
        Логин
      </Title>
      <LoginForm />
    </Card>
  )
}

LoginPage.getLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>
}

export default LoginPage
