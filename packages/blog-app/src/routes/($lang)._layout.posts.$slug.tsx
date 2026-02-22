import { useLoaderData } from 'react-router'
import { PostPage } from '~/features/post/PostPage'
import { getPostBySlug } from '~/lib/cms/hygraph'
import { buildRoutes } from '~/lib/routes'
import type { Route } from './+types/($lang)._layout.posts.$slug'

export async function loader({ params }: Route.LoaderArgs) {
  const lang = params.lang ?? 'en'
  const post = await getPostBySlug(params.slug, lang)

  if (!post) throw new Response('Not Found', { status: 404 })

  return { post, lang }
}

export function meta({ loaderData }: Route.MetaArgs) {
  return [
    { title: loaderData.post.title },
    { name: 'description', content: loaderData?.post.excerpt },
  ]
}

const PostRoute = () => {
  const { post, lang } = useLoaderData<typeof loader>()
  const routes = buildRoutes(lang)

  return <PostPage post={post} backHref={routes.home()} />
}

export default PostRoute
