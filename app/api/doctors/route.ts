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

// import { NextRequest, NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export async function GET(req: NextRequest) {
//   const searchParams = req.nextUrl.searchParams;
//   const query = searchParams.get("query");

//   try {
//     let doctors;
//     if (query) {
//       // Perform search based on the query
//       doctors = await prisma.doctor.findMany({
//         where: {
//           OR: [
//             { specialization: { contains: query, mode: "insensitive" } }, // Search by specialization
//             { specialties: { contains: query, mode: "insensitive" } }, // Search by specialties
//           ],
//         },
//       });
//     } else {
//       // If no search query, return all doctors
//       doctors = await prisma.doctor.findMany();
//     }

//     return NextResponse.json(doctors);
//   } catch (error) {
//     console.error("Error fetching doctors:", error);
//     return NextResponse.json({ error: "Failed to fetch doctors" }, { status: 500 });
//   }
// }