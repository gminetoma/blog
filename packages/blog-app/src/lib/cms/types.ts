export type Author = {
  name: string
  bio: string
  avatarUrl?: string
}

export type PostTag = {
  name: string
  slug: string
}

export type PostSummary = {
  slug: string
  title: string
  excerpt: string
  publishedAt: string
  readingTimeMinutes: number
  tags: PostTag[]
}

export type Post = PostSummary & {
  content: string
  author: Author
}

export type Comment = {
  id: string
  postSlug: string
  content: string
  createdAt: string
  parentId?: string
}
