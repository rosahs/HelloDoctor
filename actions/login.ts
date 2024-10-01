"use server";

import * as z from "zod";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import {
  DOCTOR_LOGIN_REDIRECT,
  PATIENT_LOGIN_REDIRECT,
} from "@/routes";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/send-mail";

export const login = async (
  values: z.infer<typeof LoginSchema>
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password } = validatedFields.data;

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return { error: "Email does not exist" };
    }

    if (!user.password) {
      return {
        error:
          "This account was created with Google Sign-In. Please log in using Google.",
      };
    }

    if (!user.emailVerified) {
      const verificationToken =
        await generateVerificationToken(user.email);

      await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
      );

      return { success: "Confirmation email sent!" };
    }

    const redirectTo =
      user.role === "DOCTOR"
        ? DOCTOR_LOGIN_REDIRECT
        : PATIENT_LOGIN_REDIRECT;

    await signIn("credentials", {
      email,
      password,
      redirectTo,
    });

    return { success: "Login successful!" };
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw err;
  }
};
