import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

let client: ApolloClient<any> | null = null

const getClient = () => {
  if (!client || typeof window === 'undefined') {
    client = new ApolloClient({
      link: new HttpLink({
        uri: 'http://localhost:3000/api/graphql',
      }),
      cache: new InMemoryCache().restore({}),
    })
  }

  return client
}

const browserApolloClient = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache(),
})

export { getClient, browserApolloClient }
