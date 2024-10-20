"use server";

import { db } from "@/lib/db";

export async function getDoctors() {
  try {
    const doctors = await db.doctor.findMany({
      select: {
        id: true,
        user: true,
        location: true,
        specialization: true,
      },
    });

    return doctors.map((doctor) => ({
      id: doctor.id,
      user: doctor.user,
      specialization: doctor.specialization,
    }));
  } catch (error) {
    console.error("Failed to fetch doctors:", error);
    throw new Error("Failed to fetch doctors");
  }
}
