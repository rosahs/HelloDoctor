import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const featuredDoctors = await prisma.doctor.findMany({
      take: 5,
      include: {
        user: {
          select: {
            name: true,
            image: true, // Include the image field from the associated User model
          },
        },
      },
    });

    const formattedDoctors = featuredDoctors.map(doctor => ({
      id: doctor.id,
      name: doctor.user?.name || 'Unknown',
      specialization: doctor.specialization,
      imageUrl: doctor.user?.image || '/images/placeholder-doctor-image.jpg', // Use image field
      profileUrl: `/doctors/profile/${doctor.id}`,
    }));

    return NextResponse.json(formattedDoctors);
  } catch (error) {
    console.error('Error fetching featured doctors:', error);
    return NextResponse.json({ error: 'Failed to fetch doctors' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}