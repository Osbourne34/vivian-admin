import {
  ActionIcon,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core'
import { IconSun, IconMoon } from '@tabler/icons-react'

import cx from 'clsx'
import classes from './toggle-theme.module.css'

export const ToggleTheme = () => {
  const { setColorScheme } = useMantineColorScheme()
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  })

  const toggleTheme = () => {
    setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')
  }

  return (
    <ActionIcon
      className={classes.root}
      onClick={toggleTheme}
      variant="default"
      size={'lg'}
    >
      <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
      <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
    </ActionIcon>
  )
}
