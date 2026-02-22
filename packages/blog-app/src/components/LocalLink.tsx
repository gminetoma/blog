import { Link } from 'react-router'
import { cn } from '~/lib/utils'

type LocalLinkProps = React.ComponentProps<'a'> & {
  href: string
}

export const LocalLink = (props: LocalLinkProps) => {
  return (
    <Link
      to={props.href}
      className={cn(
        props['aria-disabled'] && 'pointer-events-none text-muted-foreground',
        props.className,
      )}
      {...props}
    />
  )
}
