import { PostCard } from '~/features/home/PostCard'
import type { PostSummary } from '~/lib/cms/types'
import { buildRoutes } from '~/lib/routes'

type PostGridProps = {
  posts: PostSummary[]
  locale: string
}

export const PostGrid = (props: PostGridProps) => {
  const { posts, locale } = props
  const routes = buildRoutes(locale)

  return (
    <div>
      {posts.map((post) => (
        <PostCard
          key={post.slug}
          post={post}
          postHref={routes.post(post.slug)}
        />
      ))}
    </div>
  )
}
