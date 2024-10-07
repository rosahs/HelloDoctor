"use server";

import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { UserRole } from "@/lib/userRole";

export async function setUserRole(role: UserRole) {
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

    await user.save();

    return {
      success: `Role successfully set to '${role}'.`,
    };
  } catch {
    return {
      error: `An unexpected error occurred. Please try again.`,
    };
  }
}
