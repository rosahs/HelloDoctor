import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

import { getVerificationTokenByEmail } from "@/data/verification-token";
import { connectDB } from "./db";
import {
  PasswordResetToken,
  TwoFactorToken,
  VerificationToken,
} from "@/models/AuthModels";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";

export const generateVerificationToken = async (
  email: string
) => {
  // Generate a token and set expiration time (15 minutes from now)
  const token = uuidv4();
  const expires = new Date(
    new Date().getTime() + 15 * 60 * 1000
  ); // 15 minutes;

  await connectDB();

  const existingToken = await getVerificationTokenByEmail(
    email
  );

  console.log("existing roken id", existingToken);

  if (existingToken) {
    // Delete the existing token
    await VerificationToken.findByIdAndDelete(
      existingToken._id
    );
  }

  // Create a new verification token
  const verificationToken = await VerificationToken.create({
    email,
    token,
    expires,
  });

  return verificationToken;
};

export const generatePasswordResetToken = async (
  email: string
) => {
  const token = uuidv4();
  const expires = new Date(
    new Date().getTime() + 15 * 60 * 1000
  ); // 15 minutes;

  const existingToken = await getPasswordResetTokenByEmail(
    email
  );

  if (existingToken) {
    await PasswordResetToken.findByIdAndDelete(
      existingToken.id
    );
  }

  const passwordResetToken =
    await PasswordResetToken.create({
      email,
      token,
      expires,
    });

  return passwordResetToken;
};

export const generateTwoFactorToken = async (
  email: string
) => {
  const token = crypto
    .randomInt(100_000, 1_000_000)
    .toString();

  const expires = new Date(
    new Date().getTime() + 15 * 60 * 1000
  ); // 15 minutes;

  const existingToken = await getTwoFactorTokenByEmail(
    email
  );

  if (existingToken) {
    await TwoFactorToken.findByIdAndDelete(
      existingToken.id
    );
  }

  const twoFactorToken = await TwoFactorToken.create({
    email,
    token,
    expires,
  });

  return twoFactorToken;
};
