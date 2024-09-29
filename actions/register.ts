"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { connectDB } from "@/lib/db";
import User from "@/models/UserModel";

export const register = async (
  values: z.infer<typeof RegisterSchema>
) => {
  try {
    const validatedFields =
      RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    const { email, password, name, role } =
      validatedFields.data;

    await connectDB();

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return { error: "Email already in use" };
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await User.create({
      role,
      name,
      email,
      password: hashedPassword,
    });

    return { success: "User registered successfully" };
  } catch {
    return {
      error: "An error occurred during registration",
    };
  }
};
