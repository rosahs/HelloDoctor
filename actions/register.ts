"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { connectDB } from "@/lib/db";
import User from "@/models/UserModel";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/send-mail";
import Doctor from "@/models/DoctorModel";

export const register = async (
  values: z.infer<typeof RegisterSchema>
) => {
  try {
    await connectDB();

    const validatedFields =
      RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    const { email, password, name, role, specialization } =
      validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return { error: "Email already in use" };
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    let doctorId;

    // If the role is "DOCTOR", create a doctor document and save its ID
    if (role === "DOCTOR") {
      if (!specialization) {
        console.error(
          "Specialization missing for doctor role"
        );
        return {
          error: "Specialization is required for doctors",
        };
      }

      const doctor = await Doctor.create({
        specialization,
      });
      doctorId = doctor._id;
    }

    await User.create({
      role,
      name,
      email,
      password: hashedPassword,
      doctor: doctorId,
    });

    const verificationToken =
      await generateVerificationToken(email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "Confirmation email" };
  } catch {
    return {
      error: "An error occurred during registration",
    };
  }
};
