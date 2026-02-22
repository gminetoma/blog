import { LanguageSwitcher } from '~/components/LanguageSwitcher'
import { LocalLink } from '~/components/LocalLink'
import { ModeToggle } from '~/components/theme/ThemeModeToggle'
import type { LocaleConfig } from '~/lib/i18n/locales'

type HeaderProps = {
  homeHref: string
  lang: string
  langLinks: Record<string, string>
  locales: Record<string, LocaleConfig>
}

export const Header = (props: HeaderProps) => {
  const { homeHref, lang, langLinks, locales } = props

  return (
    <header className="py-6">
      <div className="container mx-auto px-6 max-w-2xl">
        <nav className="flex items-center justify-between">
          <LocalLink
            href={homeHref}
            className="text-sm font-semibold tracking-widest uppercase"
          >
            Gustavo Minoru
          </LocalLink>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <LanguageSwitcher
              lang={lang}
              langLinks={langLinks}
              locales={locales}
            />
            <ModeToggle />
          </div>
        </nav>
      </div>
      <hr className="border-t border-border mt-6" />
    </header>
  )
}
