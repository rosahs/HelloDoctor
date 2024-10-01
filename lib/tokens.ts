import { v4 as uuidv4 } from "uuid";

import { getVerificationTokenByEmail } from "@/data/verification-token";
import { connectDB } from "./db";
import { VerificationToken } from "@/models/AuthModels";

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
