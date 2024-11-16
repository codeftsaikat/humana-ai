import NextAuth from "next-auth"

import Github from 'next-auth/providers/github'
import Credentials from "next-auth/providers/credentials"

import bcrypt from 'bcryptjs'

import { PrismaAdapter } from '@auth/prisma-adapter'

import { prisma } from "./config/prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {strategy: 'jwt'},
  providers: [
    Github({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Credentials({

    })
  ],
})