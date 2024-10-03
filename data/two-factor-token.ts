import { connectDB } from "@/lib/db";
import { TwoFactorToken } from "@/models/AuthModels";

export const getTwoFactorTokenByToken = async (
  token: string
) => {
  await connectDB();

  try {
    const twoFactorToken = await TwoFactorToken.findOne({
      token,
    });

    return twoFactorToken;
  } catch {
    return null;
  }
};

export const getTwoFactorTokenByEmail = async (
  email: string
) => {
  try {
    await connectDB();

    const twoFactorToken = await TwoFactorToken.findOne({
      email,
    });

    return twoFactorToken;
  } catch {
    return null;
  }
};
