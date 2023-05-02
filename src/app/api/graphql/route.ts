import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { ApolloServer } from '@apollo/server'
import { NextRequest } from 'next/server'

import db from '@/src/lib/db'
import { Context } from '@/src/graphql/resolvers'
import { resolvers } from '@/src/graphql/resolvers'
import { typeDefs } from '@/src/graphql/schema'

const apolloServer = new ApolloServer<Context>({
  resolvers,
  typeDefs,
})

const handler = startServerAndCreateNextHandler<NextRequest, Context>(
  apolloServer,
  {
    context: async (req) => ({ req, db }),
  }
)

export async function GET(request: NextRequest) {
  return handler(request)
}

export async function POST(request: NextRequest) {
  return handler(request)
}
