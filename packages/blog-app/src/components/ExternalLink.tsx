import type { ReactNode } from 'react'

type LinkProps = {
  href: string
  className?: string
  children: ReactNode
}

export const ExternalLink = (props: LinkProps) => {
  const { href, className, children } = props

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  )
}
