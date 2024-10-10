import NextAuth from "next-auth";
import { getToken } from "next-auth/jwt";

import authConfig from "./auth.config";
import {
  apiAuthPrefix,
  authRoutes,
  DOCTOR_LOGIN_REDIRECT,
  doctorProtectedRoute,
  OAUTH_ROLE_SELECTION_REDIRECT,
  PATIENT_LOGIN_REDIRECT,
  patientProtectedRoute,
  publicRoutes,
} from "./routes";
import { NextResponse } from "next/server";

// Initialize NextAuth
const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  try {
    const { nextUrl } = req;

    // Get the token from the JWT
    const secret = process.env.AUTH_SECRET;
    const token = await getToken({ req, secret });

    const isLoggedIn = !!token;
    const userRole = token?.role;

    const isApiAuthRoute =
      nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(
      nextUrl.pathname
    );
    const isAuthRoute = authRoutes.includes(
      nextUrl.pathname
    );
    const isDoctorProtectedRoute =
      doctorProtectedRoute.some((route) =>
        nextUrl.pathname.startsWith(route)
      );
    const isPatientProtectedRoute =
      nextUrl.pathname.startsWith(patientProtectedRoute);

    // Handle API auth routes
    if (isApiAuthRoute) {
      // Allow API requests to continue
      return NextResponse.next();
    }

    // Auth route handling
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

      return NextResponse.next();
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
    } else if (
      isLoggedIn &&
      !userRole &&
      nextUrl.pathname !== OAUTH_ROLE_SELECTION_REDIRECT
    ) {
      return NextResponse.redirect(
        new URL(OAUTH_ROLE_SELECTION_REDIRECT, nextUrl)
      );
    }

    // Doctor route protection
    if (isDoctorProtectedRoute) {
      if (userRole !== "DOCTOR") {
        return NextResponse.redirect(new URL("/", nextUrl));
      }
    }

    // Patient route protection
    if (isPatientProtectedRoute) {
      if (userRole !== "PATIENT") {
        return NextResponse.redirect(new URL("/", nextUrl));
      }
    }

    // Redirect unauthenticated users trying to access protected routes
    if (!isLoggedIn && !isPublicRoute) {
      return NextResponse.redirect(
        new URL(`/auth/login`, nextUrl)
      );
    }

    // Add security headers
    const response = NextResponse.next();
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set(
      "X-Content-Type-Options",
      "nosniff"
    );
    response.headers.set(
      "Referrer-Policy",
      "strict-origin-when-cross-origin"
    );
    response.headers.set(
      "Permissions-Policy",
      "camera=(), microphone=(), geolocation=()"
    );

    return response;
  } catch {
    return NextResponse.error();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
