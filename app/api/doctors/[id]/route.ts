import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Create a single instance of PrismaClient to be reused
// let prisma: PrismaClient;

// if (process.env.NODE_ENV === "production") {
//   prisma = new PrismaClient();
// } else {
//   if (!(global as any).prisma) {
//     (global as any).prisma = new PrismaClient();
//   }
//   prisma = (global as any).prisma;


const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log("Received doctor ID:", params.id);
  const { id } = params;

  if (!id) {
    console.log("Doctor ID is missing");
    return NextResponse.json(
      { error: "Doctor ID is required" },
      { status: 400 }
    );
  }

  // Validate ID format (assuming it's a UUID)
  // const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  // if (!uuidRegex.test(id)) {
  //   console.log('Invalid doctor ID format:', id);
  //   return NextResponse.json({ error: 'Invalid doctor ID format' }, { status: 400 });
  // }

  try {
    // const doctor = await prisma.doctor.findUnique({
    //   where: { id },
    //   include: {
    //     user: {
    //       select: {
    //         name: true,
    //         email: true,
    //         role: true,
    //       },
    //     },
    //   },
    // });

    const doctor = await prisma.doctor.findUnique({
      where: {
        id,
      },
    });

    console.log("Found doctor:", doctor); 

    if (!doctor) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
    }

    return NextResponse.json(doctor);
  } catch (error) {
    console.error("Error fetching doctor:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Failed to fetch doctor: ${error.message}` },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { error: "An unexpected error occurred" },
        { status: 500 }
      );
    }
  }
}
