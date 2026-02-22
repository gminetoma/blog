export function getPublicEnv() {
  return {
    apiUrl:
      (import.meta.env.PUBLIC_API_URL as string | undefined) ??
      'http://localhost:8000/graphql',
    wsEndpoint:
      (import.meta.env.PUBLIC_WS_ENDPOINT as string | undefined) ??
      'ws://localhost:8000/graphql',
  }
}
