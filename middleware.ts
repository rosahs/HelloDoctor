import NextAuth from "next-auth";
import { getToken } from "next-auth/jwt";

import authConfig from "./auth.config";
import {
  apiAuthPrefix,
  authRoutes,
  DOCTOR_LOGIN_REDIRECT,
  OAUTH_ROLE_SELECTION_REDIRECT,
  PATIENT_LOGIN_REDIRECT,
  publicRoutes,
} from "./routes";
import { NextResponse } from "next/server";

// Initialize NextAuth
const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { nextUrl } = req;
  const secret = process.env.AUTH_SECRET;

  // Get the token from the JWT
  const token = await getToken({ req, secret });

  const isLoggedIn = !!token;
  const userRole = token?.role;

  const isApiAuthRoute =
    nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(
    nextUrl.pathname
  );
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Handle API auth routes
  if (isApiAuthRoute) {
    // Allow API requests to continue
    return NextResponse.next();
    // return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      // Redirect to role selection if the user is logged in but has no role
      if (!userRole) {
        return NextResponse.redirect(
          new URL(OAUTH_ROLE_SELECTION_REDIRECT, nextUrl)
        );
      }

      // Redirect based on user role
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

  // Restrict access to the role selection page if user already has a role
  if (
    nextUrl.pathname === OAUTH_ROLE_SELECTION_REDIRECT &&
    userRole
  ) {
    const redirectUrl =
      userRole === "DOCTOR"
        ? DOCTOR_LOGIN_REDIRECT
        : PATIENT_LOGIN_REDIRECT;
    return NextResponse.redirect(
      new URL(redirectUrl, nextUrl)
    );
  }

  // Redirect unauthenticated users trying to access protected routes
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

  // Continue to the next middleware or page
  return NextResponse.next();
  // return null
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
