import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getEmailInitial = (name: string) => {
  return name.split(' ').map((n) => n[0] + n[1]).join('').toUpperCase();
}

export const copyClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
}