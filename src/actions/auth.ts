'use server'

import { signIn, signOut } from "@/auth"
import { prisma } from "@/config/prisma";
import { revalidatePath } from "next/cache";
import bcryptjs from 'bcryptjs'
import { User } from "@prisma/client";

export const login = async (provider: string) => {
  await signIn(provider, { redirectTo: "/" });
  revalidatePath("/");
}

export const logout = async () => {
  await signOut({ redirectTo: "/" });
  revalidatePath("/");
}

export const loginWithCredentials = async (email: string, password: string) => {
  try {
    await signIn('credentials', { email, password, redirect: false })
  } catch (error) {
    console.error('Login error:', error)
    return { success: false, error: 'An unexpected error occurred' }
  } finally {
    revalidatePath("/")
  }
}

export const registerWithCredentials = async (name: string, email: string, password: string) => {
  try {
    const userExists = await getUserByEmail(email);
    if (userExists) {
      throw new Error("User already exists");
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      }
    })

  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    revalidatePath("/");
  }
}

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('User not found');
  }
  return user;
}

export async function validateUserPassword(user: User, password: string) {
  if (!user.password) {
    throw new Error('No password set for this user');
  }

  const isPasswordValid = await bcryptjs.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }
}