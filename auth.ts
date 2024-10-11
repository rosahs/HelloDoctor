import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "./auth.config";
import { getUserById } from "./data/user";
import { UserRole } from "./lib/userRole";
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation";
import { db } from "./lib/db";
import { Doctor } from "./next-auth";
import { getAccountByUserId } from "./data/account";

export const { handlers, auth, signIn, signOut } = NextAuth(
  {
    pages: {
      signIn: "/auth/login",
      error: "/auth/error",
    },
    events: {
      async linkAccount({ user }) {
        await db.user.update({
          where: { id: user.id },
          data: { emailVerified: new Date() },
        });
      },
    },
    callbacks: {
      async signIn({ user, account }) {
        if (!account) {
          return false;
        }

        if (account?.provider !== "credentials")
          return true;

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

          // Delete two factor confirmation for next sign in
          await db.twoFactorConfirmation.delete({
            where: { id: twoFactorConfirmation.id },
          });
        }
        return true;
      },
      async jwt({ token }) {
        if (!token.sub) return token;

        const user = await getUserById(token.sub);

        console.log("user", user);

        if (!user) return token;

        const existingAccount = await getAccountByUserId(
          user.id
        );

        token.isOAuth = !!existingAccount;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.isTwoFactorEnabled = user.isTwoFactorEnabled;
        token.profileImage = user.profileImage;

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
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
  }
);
