import NextAuth from "next-auth"
import Github from 'next-auth/providers/github'
import { PrismaAdapter } from '@auth/prisma-adapter'
import Credentials from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs'

export const { handlers: { GET, POST }, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  session: {strategy: 'jwt'},
  providers: [
    Github({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Credentials({

    })
  ],
})