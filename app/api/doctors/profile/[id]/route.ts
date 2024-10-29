import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const doctor = await db.doctor.findUnique({
      where: { id },
      select: {
        id: true,
        specialization: true,
        aboutMe: true,
        specialties: true,
        certifications: true,
        professionalExperience: true,
        languages: true,
        images: true,
        user: {
          select: {
            name: true
          }
        }
      }
    });

    if (!doctor) {
      return NextResponse.json(
        { error: 'Doctor not found' },
        { status: 404 }
      );
    }

    const formattedDoctor = {
      id: doctor.id,
      name: doctor.user?.name || 'Unknown',
      imageUrl: doctor.images?.[0] || '/images/placeholder-doctor-image.jpg',
      specialization: doctor.specialization || 'Not specified',
      specialties: doctor.specialties ? doctor.specialties.split(',') : [],
      certifications: doctor.certifications ? doctor.certifications.split(',') : [],
      experience: doctor.professionalExperience ? doctor.professionalExperience.split(',') : [],
      languages: doctor.languages ? doctor.languages.split(',') : [],
      about: doctor.aboutMe || '',
    };

    return NextResponse.json(formattedDoctor);
  } catch (error) {
    console.error('Error fetching doctor:', error);
    return NextResponse.json(
      { error: 'Failed to fetch doctor' },
      { status: 500 }
    );
  }
}