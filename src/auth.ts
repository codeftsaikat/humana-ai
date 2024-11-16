import NextAuth from "next-auth"

import Credentials from 'next-auth/providers/credentials'
import Github from 'next-auth/providers/github'

import { PrismaAdapter } from '@auth/prisma-adapter'

import { prisma } from "./config/prisma"
import { Provider } from "next-auth/providers"

import { getUserByEmail, validateUserPassword } from "./actions/auth"

const providers: Provider[] = [
  Github({
    clientId: process.env.AUTH_GITHUB_ID,
    clientSecret: process.env.AUTH_GITHUB_SECRET,
  }),
  Credentials({
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    authorize: async (credentials) => {
      try {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await getUserByEmail(credentials.email as string);

        if (!user) {
          throw new Error('User not found');
        }

        await validateUserPassword(user, credentials.password as string);

        return user;
      } catch (error) {
        console.error('Authentication error:', error);
        return null;
      }
    },
  })
]

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  providers,
})