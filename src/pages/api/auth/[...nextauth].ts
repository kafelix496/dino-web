import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

import { AccessLevels, Apps } from '@/constants'
import { MongooseAdapter } from '@/utils/db-utils'

const apps = Object.values(Apps)

export default NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60
  },
  secret: process.env.JWT_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    })
  ],
  pages: {},
  adapter: MongooseAdapter(),
  callbacks: {
    async jwt({ token, user, account }) {
      // user & account is not undefined only after sign in
      if (!(user && account)) {
        return token
      }

      if (
        account.providerAccountId ===
        process.env.SUPER_ADMIN_PROVIDER_ACCOUNT_ID
      ) {
        return {
          ...token,
          appsAccessLevel: apps.map(() => AccessLevels.SUPER_ADMIN)
        }
      }

      // if not super admin, parse later...

      return token
    },
    async session({ session, token }) {
      return Promise.resolve({
        ...session,
        user: {
          ...session.user,
          id: token?.sub,
          appsAccessLevel:
            (token?.appsAccessLevel as string[] | undefined) ??
            apps.map(() => AccessLevels.NONE)
        }
      })
    }
  }
})
