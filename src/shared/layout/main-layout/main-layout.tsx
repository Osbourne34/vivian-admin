import { ReactNode } from 'react'

import { AppShell, Burger, Flex } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { Sidebar } from './sidebar/sidebar'
import { ToggleTheme } from '../../theme/toggle-theme/toggle-theme'

interface LayoutProps {
  children: ReactNode
}

export const MainLayout = (props: LayoutProps) => {
  const { children } = props
  const [opened, { toggle }] = useDisclosure()

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="lg"
    >
      <AppShell.Header>
        <Flex align="center" px="md" h="100%">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <ToggleTheme />
        </Flex>
      </AppShell.Header>

      <AppShell.Navbar>
        <Sidebar />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  )
}
