import type { Comment } from '~/lib/cms/types'
import { CommentList } from './CommentList'
import { useComments } from './useComments'

type CommentSectionProps = {
  slug: string
  initialComments: Comment[]
}

export const CommentSection = (props: CommentSectionProps) => {
  const { slug, initialComments } = props
  const { comments } = useComments({ slug, initialComments })

  return (
    <section>
      <h2 className="text-lg font-semibold tracking-tight mb-6">Comments</h2>
      <CommentList comments={comments} />
    </section>
  )
}
