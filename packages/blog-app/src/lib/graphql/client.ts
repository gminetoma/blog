import { createClient as createWSClient } from 'graphql-ws'
import {
  cacheExchange,
  createClient,
  fetchExchange,
  subscriptionExchange,
} from 'urql'
import { getPublicEnv } from '~/lib/env'

const env = getPublicEnv()

const wsClient = createWSClient({ url: env.wsEndpoint })

export const client = createClient({
  url: env.apiUrl,
  exchanges: [
    cacheExchange,
    subscriptionExchange({
      forwardSubscription: (request) => ({
        subscribe: (sink) => ({
          unsubscribe: wsClient.subscribe(
            request as Parameters<typeof wsClient.subscribe>[0],
            sink,
          ),
        }),
      }),
    }),
    fetchExchange,
  ],
})
