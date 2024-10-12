"use server";

import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { UserRole } from "@/lib/userRole";

export async function setUserRole(
  role: UserRole,
  specialization?: string
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

    // Create or update the doctor profile if the role is DOCTOR
    let doctorId;

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

    // Update user role and doctorId
    await db.user.update({
      where: { id: user.id },
      data: {
        role,
        doctorId: doctorId || null,
      },
    });

    return {
      success: `Role successfully set to '${role}'.`,
    };
  } catch {
    return {
      error: `An unexpected error occurred`,
    };
  }
}
