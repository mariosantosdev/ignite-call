import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'
import { PrismaAdapter } from '~/lib/auth/prisma-adapter'

const scopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/calendar',
]

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      authorization: {
        params: {
          scope: scopes.join(' '),
        },
      },
      profile: (profile: GoogleProfile) => ({
        id: profile.sub,
        name: profile.name,
        username: '',
        email: profile.email,
        avatar_url: profile.picture,
      }),
    }),
  ],

  callbacks: {
    async signIn({ account }) {
      if (!account?.scope?.includes(scopes[2])) {
        return '/register/connect-calendar/?error=permissions'
      }

      return true
    },
    session: ({ session, user }) => ({ ...session, user }),
  },
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    ...authOptions,
    adapter: PrismaAdapter(req, res),
  })
}
