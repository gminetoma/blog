import type { Comment } from '~/lib/cms/types'

type CommentItemProps = {
  comment: Comment
}

export const CommentItem = (props: CommentItemProps) => {
  const { comment } = props
  const date = new Date(comment.createdAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <div className="py-4 border-b border-border last:border-0">
      <p className="text-sm leading-relaxed">{comment.content}</p>
      <time
        dateTime={comment.createdAt}
        className="mt-2 block text-xs text-muted-foreground"
      >
        {date}
      </time>
    </div>
  )
}
