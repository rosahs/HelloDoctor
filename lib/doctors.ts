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

const prisma = new PrismaClient()

export async function getDoctors(searchParams: { [key: string]: string | string[] | undefined }) {
  const { name, specialty, location } = searchParams;

  const where: any = {};

  if (name) {
    where.name = { contains: name as string, mode: 'insensitive' };
  }

  if (specialty) {
    where.specialties = { contains: specialty as string, mode: 'insensitive' }; // Ensure this matches your schema
  }

  if (location) {
    where.location = { contains: location as string, mode: 'insensitive' };
  }

  const doctors = await prisma.doctor.findMany({
    where,
    take: 20 // Limit to 20 results for performance
  });

  return doctors;
}