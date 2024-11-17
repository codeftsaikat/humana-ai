'use server'

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