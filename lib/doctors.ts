import { PrismaClient } from '@prisma/client'

export interface Doctor {
    id: string;
    name: string;
    specialty: string;
    experience: number;
    rating: number;
    imageUrl: string;
    about: string;
    specialties: string[];
    certifications: string[];
    professionalExperience: string[];
    languages: string[];
}

export interface DoctorSearchCriteria {
  name?: { contains: string; mode: 'insensitive' };
  specialties?: { contains: string; mode: 'insensitive' };
  location?: { contains: string; mode: 'insensitive' };
}

const prisma = new PrismaClient()

export async function getDoctors(searchParams: { [key: string]: string | string[] | undefined }) {
  const { name, specialty, location } = searchParams;

  const where: DoctorSearchCriteria = {};

  if (name && typeof name === 'string') {
    where.name = { contains: name, mode: 'insensitive' };
  }

  if (specialty && typeof specialty === 'string') {
    where.specialties = { contains: specialty, mode: 'insensitive' };
  }

  if (location && typeof location === 'string') {
    where.location = { contains: location, mode: 'insensitive' };
  }

  const doctors = await prisma.doctor.findMany({
    where,
    take: 20 // Limit to 20 results for performance
  });

  return doctors;
}