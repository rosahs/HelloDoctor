"use server";

import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";
export async function setUserRole(
  role: UserRole,
  specialization: string
) {
  try {
    const session = await currentUser();

    if (!session || !session.id) {
      throw new Error("Unauthorized");
    }

    if (
      role !== UserRole.PATIENT &&
      role !== UserRole.DOCTOR
    ) {
      throw new Error("Invalid role");
    }

    const user = await getUserById(session?.id);
    if (!user) {
      throw new Error("User not found");
    }

    user.role = role;

    let doctorId;
    let patientId;

    if (role === UserRole.DOCTOR) {
      if (!specialization) {
        throw new Error(
          "Specialization is required for doctors"
        );
      }

      // Create a new doctor profile
      const doctor = await db.doctor.create({
        data: {
          specialization,
        },
      });

      // Get the created doctor's ID
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

    // Update user role and doctorId
    await db.user.update({
      where: { id: user.id },
      data: {
        role,
        doctorId:
          role === UserRole.DOCTOR ? doctorId : null,
        patientId:
          role === UserRole.PATIENT ? patientId : null,
      },
    });

    return {
      success: `Role successfully set to '${role}'.`,
    };
  } catch {
    return {
      error: `An unexpected error occurred. Please try again.`,
    };
  }
}