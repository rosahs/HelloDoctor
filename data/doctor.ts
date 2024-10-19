import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getDoctorById = async (id: string) => {
  try {
    const doctor = await prisma.doctor.findUnique({
      where: {
        id,
      },
    });

    return doctor;
  } catch (error) {
    console.error('Error fetching doctor by ID:', error);
    return null;
  }
};