import NextAuth from 'next-auth'
import NextAuthProvider from 'next-auth/providers'

export default NextAuth({
  session: {
    jwt: true,
    maxAge: 24 * 60 * 60
  },
  jwt: {
    secret: process.env.JWT_SECRET
  },
  providers: [
    NextAuthProvider.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      scope:
        'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/drive.file'
    })
  ],
  pages: {},
  database: process.env.DATABASE_URL,
  callbacks: {
    async session(session, token) {
      return Promise.resolve({
        ...session,
        user: { ...session.user, id: token.sub as string }
      })
    }
  }
})
