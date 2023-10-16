import { ReactNode } from 'react'

import { Table, TableThProps, Text, UnstyledButton, rem } from '@mantine/core'
import {
  IconChevronDown,
  IconChevronUp,
  IconSelector,
} from '@tabler/icons-react'

import classes from './th.module.css'

interface ThProps extends TableThProps {
  children: ReactNode
  active: boolean
  direction: 'asc' | 'desc' | ''
  onSort: () => void
}

export const Th = (props: ThProps) => {
  const { children, onSort, active, direction, ...other } = props

  const Icon = active
    ? direction === 'asc'
      ? IconChevronUp
      : IconChevronDown
    : IconSelector

  return (
    <Table.Th className={classes.th} {...other}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Text fw={700} fz="sm">
          {children}
        </Text>
        <Icon style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
      </UnstyledButton>
    </Table.Th>
  )
}
