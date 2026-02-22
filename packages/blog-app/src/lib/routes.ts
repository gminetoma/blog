export function buildRoutes(lang?: string) {
  const prefix = lang && lang !== 'en' ? `/${lang}` : ''

  return {
    home: () => `${prefix}/` as const,
    post: (slug: string) => `${prefix}/posts/${slug}` as const,
  }
}
