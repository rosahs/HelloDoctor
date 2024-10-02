import { connectDB } from "@/lib/db";
import { TwoFactorConfirmation } from "@/models/AuthModels";

export const getTwoFactorConfirmationByUserId = async (
  userId: string
) => {
  try {
    await connectDB();

    const twoFactorConfirmation =
      await TwoFactorConfirmation.findOne({
        userId,
      });

    return twoFactorConfirmation;
  } catch {
    return null;
  }
};
