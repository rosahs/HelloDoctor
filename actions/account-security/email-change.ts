"use server";

import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/UserModel";
import { emailChangeSchema } from "@/schemas";
import * as z from "zod";

export const emailChange = async (
  value: z.infer<typeof emailChangeSchema>
) => {
  try {
    await connectDB();

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

      await User.findByIdAndUpdate(dbUser.id, {
        email: value.email,
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