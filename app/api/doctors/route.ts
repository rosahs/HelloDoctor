import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const doctorId = params.id;

  try {
    const doctor = await prisma.doctor.findUnique({
      where: {
        id: doctorId,
      },
    });

    if (!doctor) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
    }

    return NextResponse.json(doctor);
  } catch (error) {
    console.error("Error fetching doctor:", error);
    return NextResponse.json({ error: "Failed to fetch doctor" }, { status: 500 });
  }
}