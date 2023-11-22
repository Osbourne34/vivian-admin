import { ReactNode } from 'react'
import { TablerIconsProps } from '@tabler/icons-react'

type RouteBase = {
  id: string
  title: string
  icon?: (props: TablerIconsProps) => ReactNode
}

type RouteWithLink = RouteBase & {
  link: string
  children?: never
}

type RouteWithChildren = RouteBase & {
  link?: never
  children: Route[]
}

export type Route = RouteWithLink | RouteWithChildren