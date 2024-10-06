import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { getUserByEmail, getUserById } from "./data/user";
import { UserRole } from "./lib/userRole";
import { saveOAuthUser } from "./data/saveOAuthUser";
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation";
import { TwoFactorConfirmation } from "./models/AuthModels";
import { connectDB } from "./lib/db";

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
      async jwt({ token, user, account, profile }) {
        if (user && user.id) {
          // Set token ID based on the user object from signIn
          token.id = user.id;
        }

        // Check if it's OAuth (e.g., Google)
        if (account && account.provider !== "credentials") {
          const dbUser =
            (await getUserById(token.id as string)) ||
            (await getUserByEmail(token.email as string));

          if (dbUser) {
            token.id = dbUser._id.toString();
            token.name = dbUser.name;
            token.email = dbUser.email;
            token.role = dbUser.role;
            token.isTwoFactorEnabled =
              dbUser.isTwoFactorEnabled;
            token.image =
              dbUser.profileImage || profile?.picture;
          }
        }

        // Credentials-based user lookup

        const existingUser = await getUserById(
          token.sub as string
        );

        if (existingUser) {
          token.id = existingUser._id.toString();
          token.name = existingUser.name;
          token.email = existingUser.email;
          token.role = existingUser.role;
          token.isTwoFactorEnabled =
            existingUser.isTwoFactorEnabled;
          token.image = existingUser.profileImage;
        }

        return token;
      },
      async session({ token, session }) {
        if (token.id && session.user) {
          session.user.id = token.id as string;
        } else if (token.sub && session.user) {
          session.user.id = token.sub as string;
        }

        if (session.user) {
          session.user.name = token.name;
          session.user.email = token.email as string;
          session.user.role = token.role as UserRole;
          session.user.isTwoFactorEnabled =
            token.isTwoFactorEnabled as boolean;
          session.user.image = token.image as string;
        }

        return session;
      },
    },
    session: { strategy: "jwt" },
    ...authConfig,
  }
);
