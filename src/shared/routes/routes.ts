import { nanoid } from 'nanoid'

import {
  IconLayoutDashboard,
  IconCompass,
  IconMapPin,
  IconUsersGroup,
  IconBuildingFactory2,
  IconCash,
  IconBuildingFactory,
} from '@tabler/icons-react'

import { Route } from '@/shared/types/route'
import { ROUTES } from '@/shared/constants/routes'

export const routes: Route[] = [
  {
    id: nanoid(),
    title: 'Дашбоард',
    link: ROUTES.HOME,
    icon: IconLayoutDashboard,
  },
  {
    id: nanoid(),
    title: 'Регионы',
    link: ROUTES.BRANCHES,
    icon: IconCompass,
  },
  {
    id: nanoid(),
    title: 'Ориентиры',
    link: ROUTES.ORIENTS,
    icon: IconMapPin,
  },
  {
    id: nanoid(),
    title: 'Индивидуальные цены',
    link: ROUTES.PRICES,
    icon: IconCash,
  },
  {
    id: nanoid(),
    title: 'Пользователи',
    icon: IconUsersGroup,
    children: [
      {
        id: nanoid(),
        title: 'Сотрудники',
        link: ROUTES.EMPLOYEES,
      },
      {
        id: nanoid(),
        title: 'Клиенты',
        link: ROUTES.CLIENTS,
      },
      {
        id: nanoid(),
        title: 'Роли',
        link: ROUTES.ROLES,
      },
    ],
  },
  {
    id: nanoid(),
    title: 'Продукция',
    icon: IconBuildingFactory2,
    children: [
      {
        id: nanoid(),
        title: 'Продукты',
        link: ROUTES.PRODUCTS,
      },
      {
        id: nanoid(),
        title: 'Категорий',
        link: ROUTES.CATEGORIES,
      },
      {
        id: nanoid(),
        title: 'Комбо',
        link: ROUTES.COMBO,
      },
    ],
  },
  {
    id: nanoid(),
    title: 'Прозводство',
    icon: IconBuildingFactory,
    children: [
      {
        id: nanoid(),
        title: 'Типы материалов',
        link: ROUTES.MATERIAL_TYPES,
      },
      {
        id: nanoid(),
        title: 'Материалы',
        link: ROUTES.MATERIALS,
      },
      {
        id: nanoid(),
        title: 'Рецепты',
        link: ROUTES.RECIPES,
      },
      {
        id: nanoid(),
        title: 'Упаковка',
        link: ROUTES.PACKAGES,
      },
    ],
  },
]
