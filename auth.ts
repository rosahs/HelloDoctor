import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { getUserById } from "./data/user";
import { UserRole } from "./lib/userRole";
import { saveOAuthUser } from "./data/saveOAuthUser";
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation";
import { TwoFactorConfirmation } from "./models/AuthModels";
import { connectDB } from "./lib/db";
import { Doctor } from "./next-auth";

export const { handlers, auth, signIn, signOut } = NextAuth(
  {
    pages: {
      signIn: "/auth/login",
      error: "/auth/error",
    },
    callbacks: {
      async signIn({ user, account, profile }) {
        if (!account) {
          return false;
        }

        if (account.provider === "google" && profile) {
          try {
            // This function should either create or retrieve the user based on their Google profile
            const OAuthUser = await saveOAuthUser(
              profile,
              account
            );

            // Check if there was an error during user saving
            if (OAuthUser && OAuthUser.error) {
              // Redirect to the error page with the specific error message
              return `/auth/error?error=${encodeURIComponent(
                OAuthUser.error
              )}`;
            }

            if (!OAuthUser) {
              return false;
            }

            // Set the user's ID from the database (OAuthUser.id)
            user.id = OAuthUser._id.toString();

            return true;
          } catch {
            return false;
          }
        }

        if (!user.id) {
          return false;
        }

        const existingUser = await getUserById(user.id);

        //Prevent sign in without email verification`
        if (!existingUser?.emailVerified) return false;

        //  ADD 2FA CHECK
        if (existingUser.isTwoFactorEnabled) {
          const twoFactorConfirmation =
            await getTwoFactorConfirmationByUserId(
              existingUser.id
            );

          if (!twoFactorConfirmation) return false;

          await connectDB();

          // Delete two factor confirmation for next sign in
          await TwoFactorConfirmation.findByIdAndDelete(
            twoFactorConfirmation.id
          );
        }
        return true;
      },
      async jwt({ token }) {
        if (!token.sub) return token;

        const user = await getUserById(token.sub);

        console.log("user", user);

        if (!user) return token;

        token.isOAuth = !!user.authProviderId;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.isTwoFactorEnabled = user.isTwoFactorEnabled;
        token.profileImage = user.profileImage;

        if (user.role === "DOCTOR") {
          token.doctor = user.doctor;
        }

        return token;
      },
      async session({ token, session }) {
        if (token.sub && session.user) {
          session.user.id = token.sub;
        }

        if (session.user) {
          session.user.name = token.name;
          session.user.email = token.email as string;
          session.user.role = token.role as UserRole;
          session.user.isTwoFactorEnabled =
            token.isTwoFactorEnabled as boolean;
          session.user.image = token.image as string;
          session.user.isOAuth = token.isOAuth as boolean;
          session.user.profileImage =
            token.profileImage as string;
        }

        if (
          session.user &&
          token.role === "DOCTOR" &&
          token.doctor
        ) {
          session.user.doctor = token.doctor as Doctor;
        }

        return session;
      },
    },
    session: { strategy: "jwt" },
    ...authConfig,
  }
);
