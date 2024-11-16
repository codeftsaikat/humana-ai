'use server'

import { signIn, signOut } from "@/auth"
import { prisma } from "@/config/prisma";
import { revalidatePath } from "next/cache";
import bcryptjs from 'bcryptjs'
import { User } from "@prisma/client";
import { AuthError } from "next-auth";

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
    await signIn('credentials', { email, password, redirect: false });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          throw new Error('Invalid email or password');
        default:
          throw new Error('Unknown error');
      }
    }
  }
}

export const registerWithCredentials = async (name: string, email: string, password: string) => {
  try {
    const userExists = await getUserByEmail(email);
    if (userExists) {
      return { success: false, error: "User already exists" };
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      }
    });

    const result = await signIn('credentials', { email, password, redirect: false });

    if (result?.error) {
      return { success: false, error: result.error };
    }

    return { success: true };

  } catch (error) {
    console.error(error);
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return null
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