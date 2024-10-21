'use server'

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { doctorId, date, time, reason, userId } = await request.json();

    if (!doctorId || !date || !time || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields: doctorId, date, time, and userId are required.' },
        { status: 400 }
      );
    }

    // Create the appointment in the database
    const appointment = await prisma.appointment.create({
      data: {
        doctor: { connect: { id: doctorId } },
        user: { connect: { id: userId } },
        date: new Date(date),
        time,
        reason,
      },
    });

    return NextResponse.json(
      { message: 'Appointment successfully booked!', appointment },
      { status: 201 }
    );
  } catch (error) {
    console.error('Failed to create appointment:', error);
    return NextResponse.json(
      { error: 'Failed to create appointment' },
      { status: 500 }
    );
  }
}

// import { NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function POST(request: Request) {
//   try {
//     const { doctorId, date, time, reason } = await request.json();

//     if (!doctorId || !date || !time) {
//       return NextResponse.json(
//         { error: 'Missing required fields: doctorId, date, and time are required.' },
//         { status: 400 }
//       );
//     }

//     // Create the appointment in the database
//     const appointment = await prisma.appointment.create({
//       data: {
//         doctorId,
//         date: new Date(date),
//         time,
//         reason,
//       },
//     });

//     return NextResponse.json(
//       { message: 'Appointment successfully booked!', appointment },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error('Failed to create appointment:', error);
//     return NextResponse.json(
//       { error: 'Failed to create appointment' },
//       { status: 500 }
//     );
//   }
// }