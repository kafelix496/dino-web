import { MongooseAdapter } from '@/utils/db-utils'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

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
    async session({ session, token }) {
      return Promise.resolve({
        ...session,
        user: { ...session.user, id: token.sub as string }
      })
    }
  }
})
