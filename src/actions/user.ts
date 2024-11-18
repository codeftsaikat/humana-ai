'use server'

import { auth } from "@/auth";
import { prisma } from "@/config/prisma";
import { User } from "@prisma/client";
import bcryptjs from 'bcryptjs';

export async function validateUserPassword(user: User, password: string) {
  if (!user.password) {
    throw new Error('No password set for this user');
  }

  const isPasswordValid = await bcryptjs.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }
}

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return null
  }
  return user;
}

export async function setHumanizedText(userEmail: string, originalText: string, humanizedText: string): Promise<void> {

  const user = await getUserByEmail(userEmail);

  try {
    if (!user) {
      throw new Error('User not found');
    }
    await prisma.textTransformation.create({
      data: {
        originalText,
        humanizedText,
        userId: user.id
      }
    })
  } catch (error) {
    console.log(error);
    throw new Error('Error creating text transformation');
  }
}

export async function isLoggedIn(): Promise<boolean> {
  const session = await auth();
  return !!session;
}


export async function getUserTextTransformations(): Promise<string[]> {

  const session = await auth();

  if (!session || !session.user || !session.user.email) {
    throw new Error('Not logged in');
  }

  const user = await getUserByEmail(session?.user?.email);
  
  if (!user) {
    throw new Error('User not found');
  }

  const transformations = await prisma.textTransformation.findMany({
    where: {
      userId: user.id
    }
  });

  return transformations.map(t => t.humanizedText);
}