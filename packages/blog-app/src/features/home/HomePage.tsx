import { PostGrid } from '~/features/home/PostGrid'
import type { Author, PostSummary } from '~/lib/cms/types'

type HomePageProps = {
  author: Author
  posts: PostSummary[]
  locale: string
}

export const HomePage = (props: HomePageProps) => {
  const { author, posts, locale } = props

  return (
    <div className="container mx-auto px-6 max-w-2xl py-16">
      <section className="mb-16">
        <h1 className="text-2xl font-semibold tracking-tight">{author.name}</h1>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          {author.bio}
        </p>
      </section>
      <section>
        <PostGrid posts={posts} locale={locale} />
      </section>
    </div>
  )
}
