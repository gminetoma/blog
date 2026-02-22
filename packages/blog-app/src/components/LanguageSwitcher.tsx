import { Globe } from 'lucide-react'
import { LocalLink } from '~/components/LocalLink'
import { Button } from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import type { LocaleConfig } from '~/lib/i18n/locales'

type LanguageSwitcherProps = {
  lang: string
  langLinks: Record<string, string>
  locales: Record<string, LocaleConfig>
}

export const LanguageSwitcher = (props: LanguageSwitcherProps) => {
  const { lang, langLinks, locales } = props
  const triggerLabel = locales[lang]?.triggerLabel ?? lang.toUpperCase()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 gap-1.5 px-2 text-sm">
          <Globe className="h-4 w-4" />
          <span>{triggerLabel}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="gap-2 flex flex-col">
        {Object.entries(locales).map(([locale, { label }]) => {
          const isActive = locale === lang

          return (
            <DropdownMenuItem key={locale} asChild disabled={isActive}>
              <LocalLink href={langLinks[locale]} aria-disabled={isActive}>
                {label}
              </LocalLink>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
