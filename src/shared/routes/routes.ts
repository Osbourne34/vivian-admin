import { nanoid } from 'nanoid'

import {
  IconLayoutDashboard,
  IconCompass,
  IconMapPin,
  IconUsersGroup,
  IconBuildingFactory2,
  TablerIconsProps,
} from '@tabler/icons-react'

type RouteBase = {
  id: string
  title: string
  icon?: (props: TablerIconsProps) => JSX.Element
}

type RouteWithLink = RouteBase & {
  link: string
  children?: never
}

type RouteWithChildren = RouteBase & {
  link?: never
  children: Route[]
}

type Route = RouteWithLink | RouteWithChildren

export const routes: Route[] = [
  {
    id: nanoid(),
    title: 'Дашбоард',
    link: '/',
    icon: IconLayoutDashboard,
  },
  {
    id: nanoid(),
    title: 'Регионы',
    link: '/branches',
    icon: IconCompass,
  },
  {
    id: nanoid(),
    title: 'Ориентиры',
    link: '/orients',
    icon: IconMapPin,
  },
  {
    id: nanoid(),
    title: 'Пользователи',
    icon: IconUsersGroup,
    children: [
      {
        id: nanoid(),
        title: 'Сотрудники',
        link: '/employees',
      },
      {
        id: nanoid(),
        title: 'Клиенты',
        link: '/clients',
      },
      {
        id: nanoid(),
        title: 'Роли',
        link: '/roles',
      },
    ],
  },
  {
    id: nanoid(),
    title: 'Продукты',
    icon: IconBuildingFactory2,
    children: [
      {
        id: nanoid(),
        title: 'Продукты',
        link: '/products',
      },
      {
        id: nanoid(),
        title: 'Категорий',
        link: '/categories',
      },
    ],
  },
]
