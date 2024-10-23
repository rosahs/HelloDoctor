import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const featuredDoctors = await db.doctor.findMany({
      take: 5,
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    const formattedDoctors = featuredDoctors.map(doctor => ({
      id: doctor.id,
      name: doctor.user?.name || 'Unknown',
      specialization: doctor.specialization,
      imageUrl: doctor.user?.image || '/images/placeholder-doctor-image.jpg', // Use user's image or a placeholder
      profileUrl: `/doctors/profile/${doctor.id}`,
    }));

    // Return the formatted doctors as JSON response
    return NextResponse.json(formattedDoctors);
  } catch (error) {
    console.error('Error fetching featured doctors:', error);
    return NextResponse.json({ error: 'Failed to fetch doctors' }, { status: 500 });
  } finally {
    await db.$disconnect();
  }
}