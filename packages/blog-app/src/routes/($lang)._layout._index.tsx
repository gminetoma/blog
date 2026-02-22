import { useLoaderData } from 'react-router'
import { HomePage } from '~/features/home/HomePage'
import { getAuthor, getPostSummaries } from '~/lib/cms/hygraph'
import type { Route } from './+types/($lang)._layout._index'

export async function loader({ params }: Route.LoaderArgs) {
  const lang = params.lang ?? 'en'

  const [author, posts] = await Promise.all([
    getAuthor(lang),
    getPostSummaries(lang),
  ])

  return { author, posts, lang }
}

export function meta({ loaderData }: Route.MetaArgs) {
  return [{ title: loaderData.author.name }]
}

const Index = () => {
  const { author, posts, lang } = useLoaderData<typeof loader>()

  return <HomePage author={author} posts={posts} locale={lang} />
}

export default Index
