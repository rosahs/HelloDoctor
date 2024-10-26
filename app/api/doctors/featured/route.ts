// app/api/doctors/featured/route.ts

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
            email: true,
          }
        }
      }
    });
    
    // Use a default image if none are provided
    const updatedDoctors = featuredDoctors.map(doctor => ({
      ...doctor,
      images: doctor.images.length > 0 ? doctor.images : ['/images/placeholder-doctor-image.jpg']
    }));
    
    return NextResponse.json(updatedDoctors);
    console.log("Featured Doctors Data:", featuredDoctors);
    return NextResponse.json(featuredDoctors);
  } catch (error) {
    console.error('Failed to fetch featured doctors:', error);
    return NextResponse.json(
      { error: 'Failed to fetch featured doctors' },
      { status: 500 }
    );
  }
}
