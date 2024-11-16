export { auth } from "@/auth"

import { auth } from "@/auth";
import { NextResponse } from "next/server"
import type { NextRequest } from 'next/server'

const protectedRoutes = ["/account"];

export default async function middleware(req: NextRequest) {
  const session = await auth();

  const isProtected = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (!session && isProtected) {
    const absoluteUrl = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }

  return NextResponse.next();
}