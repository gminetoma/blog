import { useTranslation } from 'react-i18next'
import { LocalLink } from '~/components/LocalLink'
import { TagList } from '~/components/TagList'
import type { PostSummary } from '~/lib/cms/types'

type PostCardProps = {
  post: PostSummary
  postHref: string
}

export const PostCard = (props: PostCardProps) => {
  const { post, postHref } = props
  const { t } = useTranslation()

  return (
    <article className="py-8 border-b border-border last:border-0">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <LocalLink href={postHref}>
            <h2 className="text-lg font-semibold tracking-tight hover:text-muted-foreground transition-colors">
              {post.title}
            </h2>
          </LocalLink>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {post.excerpt}
          </p>
          <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
            <time dateTime={post.publishedAt}>{post.publishedAt}</time>
            <span>·</span>
            <span>
              {post.readingTimeMinutes} {t('post.min-read')}
            </span>
          </div>
          {post.tags.length > 0 && (
            <div className="mt-3">
              <TagList tags={post.tags} />
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
