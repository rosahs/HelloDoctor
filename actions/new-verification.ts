"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import User from "@/models/UserModel";
import { VerificationToken } from "@/models/AuthModels";

export const newVerification = async (token: string) => {
  await db();

  const existingToken = await getVerificationTokenByToken(
    token
  );

  if (!existingToken) {
    return { error: "Token does not exist!" };
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

  await User.findByIdAndUpdate(
    existingUser.id,
    {
      emailVerified: new Date(),
      email: existingToken.email,
    },
    { runValidators: true, new: true }
  );

  await VerificationToken.findByIdAndDelete(
    existingToken.id
  );

  return { success: "Email verified!" };
};
