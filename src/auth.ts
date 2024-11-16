import NextAuth from "next-auth"

import Github from 'next-auth/providers/github'
import Resend from 'next-auth/providers/resend'

import { PrismaAdapter } from '@auth/prisma-adapter'

import { prisma } from "./config/prisma"
import { Provider } from "next-auth/providers"

const providers: Provider[] = [
  Github({
    clientId: process.env.AUTH_GITHUB_ID,
    clientSecret: process.env.AUTH_GITHUB_SECRET,
  }),
  Resend
]

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  providers,
})