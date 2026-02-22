import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import { LocalLink } from '~/components/LocalLink'
import { PostHeader } from '~/features/post/PostHeader'
import type { Post } from '~/lib/cms/types'
import { CommentSection } from './comments/CommentSection'

type PostPageProps = {
  post: Post
  backHref: string
}

export const PostPage = (props: PostPageProps) => {
  const { post, backHref } = props
  const { t } = useTranslation()

  return (
    <div className="container mx-auto px-6 max-w-2xl py-16">
      <div className="mb-12">
        <LocalLink
          href={backHref}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {t('post.back-to-all')}
        </LocalLink>
      </div>
      <PostHeader post={post} />
      <hr className="border-t border-border my-10" />
      <article className="prose dark:prose-invert">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        >
          {post.content}
        </ReactMarkdown>
      </article>
      <div className="mt-16">
        <CommentSection slug={post.slug} initialComments={[]} />
      </div>
    </div>
  )
}
