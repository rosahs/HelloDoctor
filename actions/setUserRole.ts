"use server";

import { auth } from "@/auth";

import { getUserById } from "@/data/user";
import { UserRole } from "@/lib/userRole";

export async function setUserRole(role: UserRole) {
  try {
    const session = await auth();
    console.log("role session", session);

    if (!session || !session.user) {
      throw new Error("Unauthorized");
    }

    if (
      role !== UserRole.PATIENT &&
      role !== UserRole.DOCTOR
    ) {
      throw new Error("Invalid role");
    }

    const user = await getUserById(session?.user?.id);
    if (!user) {
      throw new Error("User not found");
    }

    user.role = role;
    user.emailVerified = new Date();

    await user.save();

    return {
      success: `Role successfully set to '${role}'. Your email has been verified.`,
    };
  } catch (error) {
    return {
      error: `An unexpected error occurred. Please try again later.`,
    };
  }
}
