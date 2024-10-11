"use server";

import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { emailChangeSchema } from "@/schemas";
import * as z from "zod";

export const emailChange = async (
  value: z.infer<typeof emailChangeSchema>
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

    if (value.email) {
      const existingUser = await getUserByEmail(
        value.email
      );

      if (existingUser && existingUser.id !== user.id) {
        return { error: "Email already in use!" };
      }

      await db.user.update({
        where: { id: dbUser.id },
        data: {
          email: value.email,
        },
      });
    }

    return {
      success: "You changed your email successfully!",
    };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};
