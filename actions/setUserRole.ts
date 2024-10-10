"use server";

import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { UserRole } from "@/lib/userRole";
import Doctor from "@/models/DoctorModel";

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

    if (role === UserRole.DOCTOR) {
      if (!specialization) {
        throw new Error(
          "Specialization is required for doctors"
        );
      }
      const doctor = await Doctor.create({
        specialization,
      });
      user.doctor = doctor._id;
    }

    await user.save();

    return {
      success: `Role successfully set to '${role}'.`,
    };
  } catch {
    return {
      error: `An unexpected error occurred`,
    };
  }
}
