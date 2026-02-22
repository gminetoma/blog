import type { Author, Comment, Post, PostSummary } from '~/lib/cms/types'

export const mockAuthor: Author = {
  name: 'Gustavo Minoru',
  bio: 'Software engineer and writer. I write about TypeScript, distributed systems, and the occasional philosophical detour.',
  avatarUrl: undefined,
}

export const mockPostSummaries: PostSummary[] = [
  {
    slug: 'understanding-typescript-generics',
    title: 'Understanding TypeScript Generics',
    excerpt:
      "Generics are one of TypeScript's most powerful features. In this post, we explore how to use them to write flexible, reusable code without sacrificing type safety.",
    publishedAt: '2024-11-12',
    readingTimeMinutes: 6,
    tags: [
      { name: 'TypeScript', slug: 'typescript' },
      { name: 'Programming', slug: 'programming' },
    ],
  },
  {
    slug: 'building-with-astro',
    title: 'Building Fast Sites with Astro',
    excerpt:
      "Astro's island architecture lets you ship zero JavaScript by default and hydrate only the components that need interactivity. Here's what that looks like in practice.",
    publishedAt: '2024-10-03',
    readingTimeMinutes: 8,
    tags: [
      { name: 'Astro', slug: 'astro' },
      { name: 'Web', slug: 'web' },
    ],
  },
]

export const mockPosts: Post[] = [
  {
    ...mockPostSummaries[0],
    content: `## What are Generics?

Generics allow you to write functions and types that work with any data type while maintaining type safety. Instead of writing separate functions for each type, you write one function that can handle many types.

\`\`\`typescript
function identity<T>(value: T): T {
  return value;
}

const num = identity(42);      // T inferred as number
const str = identity("hello"); // T inferred as string
\`\`\`

## Why Use Generics?

Without generics, you'd have to use \`any\`, which sacrifices all type safety. Generics give you the flexibility of \`any\` with the safety of specific types.

## Constraints

You can constrain generics to only accept certain types using \`extends\`:

\`\`\`typescript
function getLength<T extends { length: number }>(value: T): number {
  return value.length;
}
\`\`\`

This ensures \`T\` has a \`length\` property, so the function works with strings, arrays, and any other type with \`length\`.`,
    author: mockAuthor,
  },
  {
    ...mockPostSummaries[1],
    content: `## Island Architecture

Astro ships zero JavaScript by default. Every component renders to static HTML at build time. When you need interactivity, you mark a component with a \`client:\` directive to hydrate it in the browser.

\`\`\`astro
<!-- Static by default -->
<MyComponent />

<!-- Hydrate immediately -->
<MyComponent client:load />

<!-- Hydrate when visible -->
<MyComponent client:visible />
\`\`\`

## Why This Matters

Most websites don't need a full SPA. By defaulting to static HTML and hydrating only what's necessary, Astro ships dramatically less JavaScript, resulting in faster load times and better Core Web Vitals.

## Integration with React

You can bring your React components into Astro and they'll be statically rendered unless you add a \`client:\` directive. This lets you use the React ecosystem without the runtime cost.`,
    author: mockAuthor,
  },
]

export const mockComments: Comment[] = [
  {
    id: '1',
    postSlug: 'understanding-typescript-generics',
    content: 'Great explanation! The constraint example really clicked for me.',
    createdAt: '2024-11-14T09:23:00Z',
  },
  {
    id: '2',
    postSlug: 'understanding-typescript-generics',
    content:
      'Would love a follow-up on conditional types. Those always trip me up.',
    createdAt: '2024-11-15T14:07:00Z',
  },
]
