import type { Comment } from '~/lib/cms/types'
import { CommentItem } from './CommentItem'

type CommentListProps = {
  comments: Comment[]
}

export const CommentList = (props: CommentListProps) => {
  const { comments } = props

  if (comments.length === 0) {
    return <p className="text-sm text-muted-foreground">No comments yet.</p>
  }

  return (
    <div>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  )
}
