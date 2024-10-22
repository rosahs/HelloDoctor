// File: app/api/doctors/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { db } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const doctorId = params.id;

    const doctor = await db.doctor.findUnique({
      where: { id: doctorId },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    if (!doctor) {
      return NextResponse.json({ error: 'Doctor not found' }, { status: 404 });
    }

    const doctorProfile = {
      id: doctor.id,
      name: doctor.user?.name ?? 'Unknown',
      specialty: doctor.specialization ?? 'Not specified',
      imageUrl: doctor.images && doctor.images.length > 0 ? doctor.images[0] : '/images/placeholder-doctor-image.jpg',
      about: doctor.aboutMe || 'No information available',
      specialties: doctor.specialties?.split(',') ?? [],
      certifications: doctor.certifications?.split(',') ?? [],
      experience: doctor.professionalExperience ? [doctor.professionalExperience] : [],
      languages: doctor.languages?.split(',') ?? [],
    };

    return NextResponse.json(doctorProfile);
  } catch (error) {
    console.error('Error fetching doctor:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}