import type { ReactNode } from 'react'
import { Provider } from 'urql'
import { client } from '~/lib/graphql/client'

export const GraphQLProvider = (props: { children: ReactNode }) => {
  const { children } = props

  return <Provider value={client}>{children}</Provider>
}
