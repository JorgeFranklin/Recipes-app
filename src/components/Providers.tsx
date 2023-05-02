'use client'

import { ReactNode } from 'react'
import { ApolloProvider } from '@apollo/client'
import { SessionProvider } from 'next-auth/react'

import { browserApolloClient } from '@/src/lib/apollo'

export type ClientProvidersProps = {
  children: ReactNode
}

const ClientProviders = ({ children }: ClientProvidersProps) => {
  return (
    <SessionProvider>
      <ApolloProvider client={browserApolloClient}>{children}</ApolloProvider>
    </SessionProvider>
  )
}

export default ClientProviders
