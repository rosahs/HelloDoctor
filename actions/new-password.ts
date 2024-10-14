"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { NewPasswordSchema } from "@/schemas";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import User from "@/models/UserModel";
import { PasswordResetToken } from "@/models/AuthModels";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  await db();

  if (!token) {
    return { error: "Missing token!" };
  }

  const validatedFields =
    NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(
    token
  );

  if (!existingToken) {
    return { error: "Invalid token!" };
  }

  const hasExpired =
    new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(
    existingToken.email
  );

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  // Check if the new password is the same as the current one
  const isSamePassword = await bcrypt.compare(
    password,
    existingUser.password
  );

  if (isSamePassword) {
    return {
      error:
        "New password cannot be the same as the old password!",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.findByIdAndUpdate(existingUser.id, {
    password: hashedPassword,
  });

  await PasswordResetToken.findByIdAndDelete(
    existingToken.id
  );

  return { success: "Password updated!" };
};
