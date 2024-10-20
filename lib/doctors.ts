import { PrismaClient, Prisma } from '@prisma/client';

interface Doctor {
  id: string;
  specialization: string;
  images: string[];
  aboutMe?: string;
  // location: string;
  specialties?: string;
  certifications?: string;
  professionalExperience?: string;
  languages?: string;
}

const prisma = new PrismaClient();

export async function getDoctors(searchParams: { [key: string]: string | string[] | undefined }) {
  const { specialization, specialties } = searchParams;

  const where: Prisma.DoctorWhereInput = {};

  if (specialization && typeof specialization === 'string') {
    where.specialization = { contains: specialization, mode: 'insensitive' };
  }

  if (specialties && typeof specialties === 'string') {
    where.specialties = { contains: specialties, mode: 'insensitive' };
  }

  // if (location && typeof location === 'string') {
  //   where.location = { contains: location, mode: 'insensitive' };
  // }

  const doctors = await prisma.doctor.findMany({
    where,
    take: 20, // Limit to 20 results for performance
  });

  return doctors;
}

export default Doctor;