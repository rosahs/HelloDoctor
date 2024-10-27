import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const featuredDoctors = await db.doctor.findMany({
      take: 5,
      select: {
        id: true,
        specialization: true,
        images: true, 
        user: {
          select: {
            name: true,
          }
        }
      }
    });

    const updatedDoctors = featuredDoctors.map(doctor => ({
      id: doctor.id,
      name: doctor.user?.name || 'Unknown',
      specialization: doctor.specialization,
      imageUrl: doctor.images.length > 0 ? doctor.images[0] : '/images/placeholder-doctor-image.jpg',
      profileUrl: `/doctors/${doctor.specialization.toLowerCase().replace(/ /g, '-')}/${doctor.id}`,
    }));
    
    console.log("Doctor data in FeaturedDoctors:", updatedDoctors);
    
    return NextResponse.json(updatedDoctors);
  } catch (error) {
    console.error('Failed to fetch featured doctors:', error);
    return NextResponse.json({ error: 'Failed to fetch featured doctors' }, { status: 500 });
  } finally {
    await db.$disconnect();
  }
}