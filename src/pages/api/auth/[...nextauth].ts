import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

import { MongooseAdapter } from '@/utils/database'

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

      return token
    },
    async session({ session }) {
      return session
    }
  }
})
