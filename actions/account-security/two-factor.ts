"use server";

import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import User from "@/models/UserModel";

export const toggleTwoFactorAuth = async () => {
  try {
    await db();

    const user = await currentUser();

    if (!user || !user.id) {
      return { error: "Unauthorized" };
    }

    const dbUser = await getUserById(user.id);

    await User.findByIdAndUpdate(dbUser.id, {
      isTwoFactorEnabled: !dbUser.isTwoFactorEnabled,
    });

    return {
      success: true,
    };
  } catch (error) {
    return { error: "Failed to toggle 2FA" };
  }
};
