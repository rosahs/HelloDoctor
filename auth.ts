import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { connectDB } from "./lib/db";
import authConfig from "./auth.config";
import { getUserById } from "./data/user";
import { UserRole } from "./lib/userRole";

export const { handlers, auth, signIn, signOut } = NextAuth(
  {
    callbacks: {
      async jwt({ token }) {
        if (!token.sub) return token;

        const existingUser = await getUserById(token.sub);

        if (!existingUser) return token;

        token.role = existingUser.role;
        token.id = existingUser._id.toString();
        return token;
      },
      async session({ token, session }) {
        if (token.sub && session.user) {
          session.user.id = token.sub;
        }

        if (token.role && session.user) {
          session.user.role = token.role as UserRole;
        }

        return session;
      },
    },
    adapter: MongoDBAdapter(connectDB),
    session: { strategy: "jwt" },
    ...authConfig,
  }
);
