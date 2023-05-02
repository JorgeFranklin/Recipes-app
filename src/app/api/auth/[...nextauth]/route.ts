import db from '@/src/lib/db'
import NextAuth, { type NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

function getGoogleCredentials() {
  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET

  if (!clientId || clientId.length === 0) {
    throw new Error('Missing GOOGLE_CLIENT_ID')
  }

  if (!clientSecret || clientSecret.length === 0) {
    throw new Error('Missing GOOGLE_CLIENT_SECRET')
  }

  return { clientId, clientSecret }
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/sign-in',
  },

  providers: [
    GoogleProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret,
      checks: 'none',
    }),
  ],

  secret: process.env.NEXT_AUTH_SECRET,

  callbacks: {
    async signIn({ user }) {
      const { name, image, email } = user

      if (!email || !image || !name) {
        throw new Error('login failed, insufficient credentials.')
      }

      const existingUser = await db.user.findUnique({
        where: {
          email,
        },
      })

      if (existingUser) {
        await db.user.update({
          where: { email },
          data: { name, image },
        })
      } else {
        await db.user.create({
          data: { email, name, image },
        })
      }

      return true
    },
    redirect() {
      return '/'
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
