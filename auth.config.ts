import type { NextAuthConfig } from "next-auth";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const validatedFields =
          LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUserByEmail(email);
          console.log("Fetched User:", user);

          if (!user || !user.password) {
            console.log("User not found or no password.");
            return null;
          }

          const passwordsMatch = await bcrypt.compare(
            password,
            user.password
          );
          console.log("Passwords Match:", passwordsMatch);

          if (passwordsMatch) return user;
        }

        console.log("Authorization failed.");
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
