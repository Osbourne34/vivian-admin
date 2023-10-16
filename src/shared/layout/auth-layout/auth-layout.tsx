import { Box, Container } from '@mantine/core'

import classes from './login.module.css'
import { ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
}

export const AuthLayout = (props: AuthLayoutProps) => {
  const { children } = props

  return (
    <Box className={classes.root}>
      <Container size="xs" className={classes.container}>
        {children}
      </Container>
    </Box>
  )
}
