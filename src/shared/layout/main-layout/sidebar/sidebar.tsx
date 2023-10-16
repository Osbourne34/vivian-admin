import { useRouter } from 'next/router'
import NextLink from 'next/link'

import { NavLink, ScrollArea } from '@mantine/core'

import { routes } from '@/shared/routes/routes'

export const Sidebar = () => {
  const { pathname } = useRouter()

  const activeRoute = (link: string) => {
    if (pathname === link) return true
    return link !== '/' ? pathname.startsWith(link) : false
  }

  return (
    <ScrollArea>
      {routes.map(({ icon: Icon, id, title, children, link }) => {
        if (link) {
          return (
            <NavLink
              key={id}
              active={activeRoute(link)}
              label={title}
              component={NextLink}
              href={link}
              leftSection={Icon && <Icon stroke={1.5} />}
            />
          )
        }
        if (children) {
          return (
            <NavLink
              key={id}
              label={title}
              childrenOffset={0}
              defaultOpened={children.some(({ link }) =>
                pathname.includes(link!)
              )}
              leftSection={Icon && <Icon stroke={1.5} />}
            >
              {children.map(({ id, title, link }) => (
                <NavLink
                  key={id}
                  active={activeRoute(link!)}
                  pl={36}
                  label={title}
                  component={NextLink}
                  href={link!}
                />
              ))}
            </NavLink>
          )
        }
      })}
    </ScrollArea>
  )
}
