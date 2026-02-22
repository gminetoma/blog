import { useMemo } from 'react'
import { I18nextProvider } from 'react-i18next'
import { Outlet, useLoaderData } from 'react-router'
import { Footer } from '~/components/Footer'
import { GraphQLProvider } from '~/components/GraphQLProvider'
import { Header } from '~/components/Header'
import { i18n } from '~/lib/i18n/i18n'
import { LOCALES } from '~/lib/i18n/locales'
import { buildRoutes } from '~/lib/routes'
import type { Route } from './+types/($lang)._layout'

export async function loader({ params, request }: Route.LoaderArgs) {
  const lang = params.lang ?? 'en'

  if (lang !== 'en' && !(lang in LOCALES)) {
    throw new Response('Not Found', { status: 404 })
  }

  const { pathname } = new URL(request.url)

  const replaceRegex = new RegExp(`^/${lang}(?=/|$)`)

  const pathWithoutLocale =
    lang !== 'en' ? pathname.replace(replaceRegex, '') || '/' : pathname

  const langLinks = Object.fromEntries(
    Object.keys(LOCALES).map((locale) => [
      locale,
      locale === 'en' ? pathWithoutLocale : `/${locale}${pathWithoutLocale}`,
    ]),
  )

  return { lang, langLinks }
}

const Layout = () => {
  const { lang, langLinks } = useLoaderData<typeof loader>()
  const routes = buildRoutes(lang)

  const i18nInstance = useMemo(() => i18n.cloneInstance({ lng: lang }), [lang])

  return (
    <GraphQLProvider>
      <I18nextProvider i18n={i18nInstance}>
        <Header
          homeHref={routes.home()}
          lang={lang}
          langLinks={langLinks}
          locales={LOCALES}
        />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </I18nextProvider>
    </GraphQLProvider>
  )
}

export default Layout
