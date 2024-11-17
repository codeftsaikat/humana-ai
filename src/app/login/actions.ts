'use server'

import { signIn, signOut } from "@/auth"
import { prisma } from "@/config/prisma";
import bcryptjs from 'bcryptjs'
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/actions/user";

export const login = async (provider: string) => {
  await signIn(provider, { redirectTo: "/" });
}

export const logout = async () => {
  await signOut({ redirectTo: "/" });
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
