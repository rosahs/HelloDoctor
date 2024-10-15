"use server";

import * as z from "zod";

import { DoctorAboutMeSchema } from "@/schemas";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export const editAboutMe = async (
  values: z.infer<typeof DoctorAboutMeSchema>
) => {
  try {
    const user = await currentUser();

    if (!user || !user.id) {
      return { error: "Unauthorized" };
    }

    const dbUser = await getUserById(user.id);

    await db.user.update({
      where: { id: dbUser?.id },
      data: {
        isTwoFactorEnabled: !dbUser?.isTwoFactorEnabled,
      },
    });

    return {
      success: true,
    };
  } catch {
    return { error: "Failed to toggle 2FA" };
  }
};