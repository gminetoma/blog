import { mockAuthor, mockPostSummaries, mockPosts } from '~/lib/cms/mock-data'
import type { Author, Post, PostSummary } from '~/lib/cms/types'

// Hygraph query (replace mock with real fetch):
// query GetAuthor($locale: Locale!) {
//   author(where: { slug: "alex-rivera" }, locales: [$locale]) {
//     name
//     bio
//     avatarUrl
//   }
// }
export async function getAuthor(_locale = 'en'): Promise<Author> {
  return mockAuthor
}

// Hygraph query:
// query GetPostSummaries($locale: Locale!) {
//   posts(locales: [$locale], orderBy: publishedAt_DESC) {
//     slug
//     title
//     excerpt
//     publishedAt
//     readingTimeMinutes
//     tags { name slug }
//   }
// }
export async function getPostSummaries(_locale = 'en'): Promise<PostSummary[]> {
  return mockPostSummaries
}

// Hygraph query:
// query GetPostBySlug($slug: String!, $locale: Locale!) {
//   post(where: { slug: $slug }, locales: [$locale]) {
//     slug
//     title
//     excerpt
//     publishedAt
//     readingTimeMinutes
//     tags { name slug }
//     content
//     author { name bio avatarUrl }
//   }
// }
export async function getPostBySlug(
  slug: string,
  _locale = 'en',
): Promise<Post | null> {
  return mockPosts.find((p) => p.slug === slug) ?? null
}

// Hygraph query:
// query GetAllPostSlugs($locale: Locale!) {
//   posts(locales: [$locale]) { slug }
// }
export async function getAllPostSlugs(_locale = 'en'): Promise<string[]> {
  return mockPostSummaries.map((p) => p.slug)
}
