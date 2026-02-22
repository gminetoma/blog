import { Badge } from '~/components/ui/badge'
import type { PostTag } from '~/lib/cms/types'

type TagListProps = {
  tags: PostTag[]
}

export const TagList = (props: TagListProps) => {
  const { tags } = props

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge key={tag.slug} variant="secondary">
          {tag.name}
        </Badge>
      ))}
    </div>
  )
}
