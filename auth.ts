import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { getUserByEmail, getUserById } from "./data/user";
import { UserRole } from "./lib/userRole";
import { saveOAuthUser } from "./data/saveOAuthUser";

export const { handlers, auth, signIn, signOut } = NextAuth(
  {
    callbacks: {
      async signIn({ user, account, profile }) {
        if (!account) {
          return false;
        }

        if (account.provider === "google" && profile) {
          try {
            await saveOAuthUser(profile, account);
            return true;
          } catch {
            return false;
          }
        }

        console.log("user", user);

        // Ensure user.id is defined before proceeding
        if (!user.id) {
          return false;
        }

        const existingUser = await getUserById(user.id);

        //Prevent sign in without email verification`
        if (!existingUser?.emailVerified) return false;

        // TODO: ADD 2FA CHECK

        // if (account.provider === "credentials") {
        //   return true;
        // }

        return true;
      },
      async jwt({ token }) {
        if (token.email) {
          const dbUser = await getUserByEmail(token.email);
          if (dbUser) {
            token.id = dbUser._id.toString();
            token.role = dbUser.role;
          }
        }

        return token;
      },
      async session({ token, session }) {
        if (token.id && session.user) {
          session.user.id = token.id as string;
        } else if (token.sub && session.user) {
          session.user.id = token.sub as string;
        }

        if (token.role && session.user) {
          session.user.role = token.role as UserRole;
        }

        return session;
      },
    },
    session: { strategy: "jwt" },
    ...authConfig,
  }
);
