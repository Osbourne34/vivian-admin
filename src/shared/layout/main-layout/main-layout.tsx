import { ReactNode } from 'react'

import { AppShell, Burger, Drawer, Flex } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { Sidebar } from './sidebar/sidebar'
import { ToggleTheme } from '../../theme/toggle-theme/toggle-theme'

interface LayoutProps {
  children: ReactNode
}

export const MainLayout = (props: LayoutProps) => {
  const { children } = props
  const [opened, { toggle, close }] = useDisclosure()

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 240,
        breakpoint: 'md',
        collapsed: { mobile: true },
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
        <Drawer
          opened={opened}
          onClose={close}
          size="xs"
          styles={{
            body: {
              paddingLeft: 0,
              paddingRight: 0,
            },
          }}
        >
          <Sidebar />
        </Drawer>
        <Sidebar />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  )
}
