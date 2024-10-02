import { connectDB } from "@/lib/db";
import { PasswordResetToken } from "@/models/AuthModels";

export const getPasswordResetTokenByToken = async (
  token: string
) => {
  try {
    await connectDB();

    const passwordResetToken =
      await PasswordResetToken.findOne({
        token,
      });

    return passwordResetToken;
  } catch {
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (
  email: string
) => {
  try {
    await connectDB();

    const passwordResetToken =
      await PasswordResetToken.findOne({
        email,
      });

    return passwordResetToken;
  } catch {
    return null;
  }
};
