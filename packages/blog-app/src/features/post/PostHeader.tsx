import { useTranslation } from 'react-i18next'
import { TagList } from '~/components/TagList'
import type { Post } from '~/lib/cms/types'

type PostHeaderProps = {
  post: Post
}

export const PostHeader = (props: PostHeaderProps) => {
  const { post } = props
  const { t } = useTranslation()

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold tracking-tight">{post.title}</h1>
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <span>
          {t('post.by')} {post.author.name}
        </span>
        <span>·</span>
        <time dateTime={post.publishedAt}>{post.publishedAt}</time>
        <span>·</span>
        <span>
          {post.readingTimeMinutes} {t('post.min-read')}
        </span>
      </div>
      {post.tags.length > 0 && <TagList tags={post.tags} />}
    </div>
  )
}
