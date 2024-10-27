import { db } from '@/lib/db';
import { Prisma } from '@prisma/client';

interface Doctor {
  id: string;
  specialization: string;
  images: string[];
  aboutMe: string;
  specialties: string;
  certifications: string;
  professionalExperience: string;
  languages: string;
  userId: string | null;
  user?: {
    name: string | null;
    email: string | null;
  };
}

type DoctorWhereInput = Prisma.DoctorWhereInput;

export async function getDoctors(searchParams: { [key: string]: string | string[] | undefined }): Promise<Doctor[]> {
  const { specialization, specialties, languages } = searchParams;

  const where: DoctorWhereInput = {};

  if (typeof specialization === 'string') {
    where.specialization = { contains: specialization, mode: 'insensitive' };
  }

  if (typeof specialties === 'string') {
    where.specialties = { contains: specialties, mode: 'insensitive' };
  }

  if (typeof languages === 'string') {
    where.languages = { contains: languages, mode: 'insensitive' };
  }

  const doctors = await db.doctor.findMany({
    where,
    select: {
      id: true,
      specialization: true,
      images: true,
      aboutMe: true,
      specialties: true,
      certifications: true,
      professionalExperience: true,
      languages: true,
      userId: true,
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    take: 20,
  });

  return doctors.map((doctor): Doctor => ({
    id: doctor.id,
    specialization: doctor.specialization,
    images: doctor.images || ['/images/placeholder-doctor-image.jpg'],
    aboutMe: doctor.aboutMe ?? 'No information available.',
    specialties: doctor.specialties ?? 'General Practitioner',
    certifications: doctor.certifications ?? 'No certifications listed.',
    professionalExperience: doctor.professionalExperience ?? 'No experience information available',
    languages: doctor.languages ?? 'Not specified',
    userId: doctor.userId,
    user: doctor.user ? {
      name: doctor.user.name,
      email: doctor.user.email,
    } : undefined,
  }));
}

export async function getFeaturedDoctors() {
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
          },
        },
      },
    });

    // Ensure consistency and fallback logic
    return featuredDoctors.map((doctor): Doctor => ({
      id: doctor.id,
      specialization: doctor.specialization ?? 'Not specified',
      images: doctor.images && doctor.images.length > 0 ? doctor.images : ['/images/placeholder-doctor-image.jpg'],
      user: doctor.user ? {
        name: doctor.user.name ?? 'Name not available',
        email: doctor.user.email ?? 'No email available',
      } : undefined,
      aboutMe: 'No information available.',
      specialties: 'General Practitioner',
      certifications: 'No certifications listed.',
      professionalExperience: 'No experience information available',
      languages: 'Not specified',
      userId: doctor.id, // Using doctor.id as a fallback for userId
    }));

  } catch (error) {
    console.error('Failed to fetch featured doctors:', error);
    return [];
  }
}

export type { Doctor };