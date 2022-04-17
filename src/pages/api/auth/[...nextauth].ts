import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

import { AccessLevels, Apps } from '@/constants'
import { MongooseAdapter } from '@/utils/db-utils'

export default NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60
  },
  secret: process.env.NEXTAUTH_SECRET,
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

      return {
        ...token,
        ...Object.values(Apps).reduce((accu, app) => {
          const appAccessLevelName = `${app}AccessLevel`

          return {
            ...accu,
            [appAccessLevelName]:
              user[appAccessLevelName] !== undefined
                ? user[appAccessLevelName]
                : AccessLevels.NONE
          }
        }, {})
      }
    },
    async session({ session, token }) {
      return Promise.resolve({
        ...session,
        user: {
          ...session.user,
          id: token?.sub,
          ...{
            ...token,
            ...Object.values(Apps).reduce((accu, app) => {
              const appAccessLevelName = `${app}AccessLevel`

              return {
                ...accu,
                [appAccessLevelName]:
                  token[appAccessLevelName] !== undefined
                    ? token[appAccessLevelName]
                    : AccessLevels.NONE
              }
            }, {})
          }
        }
      })
    }
  }
})
