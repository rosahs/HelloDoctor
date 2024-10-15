"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/send-mail";
import { UserRole } from "@prisma/client";

export const register = async (
  values: z.infer<typeof RegisterSchema>
) => {
  try {
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
    let patientId;

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

      const doctor = await db.doctor.create({
        data: {
          specialization,
        },
      });
      doctorId = doctor.id;
    }

    // Create a Patient record
    if (role === UserRole.PATIENT) {
      const patient = await db.patient.create({
        data: {
          savedDoctors: [],
        },
      });

      patientId = patient.id;
    }

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role as UserRole,
        doctorId:
          role === UserRole.DOCTOR ? doctorId : null,
        patientId:
          role === UserRole.PATIENT ? patientId : null,
      },
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