import type { ReactNode } from 'react'
import { NavLink as RouterNavLink } from 'react-router'
import { cn } from '~/lib/utils'

type NavLinkProps = {
  href: string
  className?: string
  activeClassName?: string
  children: ReactNode
}

export const NavLink = (props: NavLinkProps) => {
  const {
    href,
    className,
    activeClassName = 'text-foreground font-medium',
    children,
  } = props

  return (
    <RouterNavLink
      to={href}
      className={({ isActive }) =>
        cn('transition-colors', className, isActive && activeClassName)
      }
    >
      {children}
    </RouterNavLink>
  )
}
