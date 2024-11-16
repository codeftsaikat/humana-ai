import NextAuth from "next-auth"

import Github from 'next-auth/providers/github'
import Credentials from "next-auth/providers/credentials"

// import bcrypt from 'bcryptjs'

import { PrismaAdapter } from '@auth/prisma-adapter'

import { prisma } from "./config/prisma"
import { Provider } from "next-auth/providers"

const providers: Provider[] = [
  Github({
    clientId: process.env.AUTH_GITHUB_ID,
    clientSecret: process.env.AUTH_GITHUB_SECRET,
  }),
  Credentials({
    credentials: { password: { label: "Password", type: "password" } },
    authorize(c) {
      if (c.password !== "password") return null
      return {
        id: "test",
        name: "Test User",
        email: "test@example.com",
      }
    },
  })
]

export const providerMaps = providers
  .map((provider) => {
    if (typeof provider === 'function') {
      const providerData = provider()
      return { id: providerData.id, name: providerData.name }
    } else {
      return { id: provider.id, name: provider.name }
    }
  })
  .filter((provider) => provider.id !== 'credentials')

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  providers,
  // pages: {
  //   signIn: "/login"
  // }
})