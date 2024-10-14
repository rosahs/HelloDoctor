import { PrismaClient } from '@prisma/client';
import { Doctor } from '@/lib/doctors'; // Assuming the interface is defined in this path

const prisma = new PrismaClient();

export async function getDoctorById(id: string): Promise<Doctor | null> {
    const doctor = await prisma.doctor.findUnique({
      where: { id },
    });
  
    if (!doctor) {
      return null;
    }
  
    return {
      id: doctor.id,
      name: doctor.name || 'Unknown Doctor',
      specialty: doctor.specialization || doctor.specialty,
      experience: doctor.experience || 0,
      rating: doctor.rating || 0,
      images: doctor.images || ['/images/placeholder-doctor-image.jpg'], // Ensure images array exists
      about: doctor.aboutMe || 'No information available.',
      specialties: doctor.specialties || [],
      certifications: doctor.certifications || [],
      professionalExperience: doctor.professionalExperience || [],
      languages: doctor.languages || [],
    };
  }