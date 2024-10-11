"use server";

import bcrypt from "bcryptjs";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import User from "@/models/UserModel";
import { passwordChangeSchema } from "@/schemas";
import * as z from "zod";

export const passwordChange = async (
  values: z.infer<typeof passwordChangeSchema>
) => {
  try {
    const user = await currentUser();

    if (!user || !user.id) {
      return { error: "Unauthorized" };
    }

    const dbUser = await getUserById(user.id);

    if (!dbUser) {
      return { error: "Unauthorized" };
    }

    if (values.password && values.newPassword) {
      const passwordsMatch = await bcrypt.compare(
        values.password,
        dbUser.password
      );

      if (!passwordsMatch) {
        return { error: "Incorrect password!" };
      }

      const hashedPassword = await bcrypt.hash(
        values.newPassword,
        10
      );

      await prisma.user.update({
        where: { id: dbUser.id },
        data: {
          password: hashedPassword,
        },
      });
    }

    return {
      success: "Your password was changed successfully",
    };
  } catch {
    return { error: "Something went wrong!" };
  }
};
