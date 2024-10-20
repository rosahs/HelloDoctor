import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateDoctors() {
  try {
    const doctors = await prisma.doctor.findMany({ where: { userId: null } });

    for (const doctor of doctors) {
      // Example logic: Find the first available user (you can modify this logic)
      const user = await prisma.user.findFirst();

      if (user) {
        await prisma.doctor.update({
          where: { id: doctor.id },
          data: { userId: user.id },
        });
        console.log(`Updated doctor ${doctor.id} with user ID ${user.id}`);
      }
    }

    console.log('Finished updating doctors');
  } catch (error) {
    console.error('Error updating doctors:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateDoctors();