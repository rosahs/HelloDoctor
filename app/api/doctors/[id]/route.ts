"use server";

import { db } from "@/lib/db";

export async function getDoctors() {
  try {
    const doctors = await db.doctor.findMany({
      select: {
        id: true,
        user: {
          select: {
            name: true,
          },
        },
        specialization: true,
      },
    });

    console.log(doctors);

    return doctors.map((doctor) => ({
      id: doctor.id,
      name: doctor.user?.name || "Unknown",
      specialization: doctor.specialization,
    }));
  } catch (error) {
    console.error("Failed to fetch doctors:", error);
    throw new Error("Failed to fetch doctors");
  }
}

