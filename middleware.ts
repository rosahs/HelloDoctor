import NextAuth from "next-auth";
import { getToken } from "next-auth/jwt";

import authConfig from "./auth.config";
import {
  apiAuthPrefix,
  authRoutes,
  DOCTOR_LOGIN_REDIRECT,
  PATIENT_LOGIN_REDIRECT,
  publicRoutes,
} from "./routes";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { nextUrl } = req;

  const secret = process.env.AUTH_SECRET;

  const token = await getToken({ req, secret });

  const isLoggedIn = !!token;

  const isApiAuthRoute =
    nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(
    nextUrl.pathname
  );
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      const userRole = token.role;
      const redirectUrl =
        userRole === "DOCTOR"
          ? DOCTOR_LOGIN_REDIRECT
          : PATIENT_LOGIN_REDIRECT;

      return NextResponse.redirect(
        new URL(redirectUrl, nextUrl)
      );
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    let from = nextUrl.pathname;
    if (nextUrl.search) {
      from += nextUrl.search;
    }

    return NextResponse.redirect(
      new URL(
        `/login?from=${encodeURIComponent(from)}`,
        nextUrl
      )
    );
  }

  return null;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
