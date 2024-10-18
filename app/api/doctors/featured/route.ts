// app/api/doctors/featured/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const featuredDoctors = await prisma.doctor.findMany({
      take: 5, // Limit to 5 featured doctors
    });

    return NextResponse.json(featuredDoctors);
  } catch (error) {
    console.error('Failed to fetch featured doctors:', error);
    return NextResponse.json(
      { error: 'Failed to fetch featured doctors' },
      { status: 500 }
    );
  }
}