import { db } from "@/lib/db";

export const getDoctorById = async (id: string) => {
  try {
    const doctor = await db.doctor.findUnique({
      where: {
        id,
      },
    });

    return doctor;
  } catch {
    return null;
  }
};

// import { PrismaClient, Doctor as PrismaDoctor } from '@prisma/client';
// import { Doctor } from '@/lib/doctors'; // Assuming the interface is defined in this path

// const prisma = new PrismaClient();

// export async function getDoctorById(id: string): Promise<Doctor | null> {
//     const doctor = await prisma.doctor.findUnique({
//       where: { id },
//     });
  
//     if (!doctor) {
//       return null;
//     }
  
//     return {
//       id: doctor.id,
//       name: doctor.name,
//       specialty: doctor.specialization,
//       imageUrl: doctor.images[0] || '/images/placeholder-doctor-image.jpg',
//       about: doctor.aboutMe || 'No information available.',
//       specialties: doctor.specialties || null,
//       certifications: doctor.certifications || null,
//       experience: doctor.professionalExperience || null,
//       languages: doctor.languages || null,
//     };
//   }