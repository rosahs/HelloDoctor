import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testFetchFeaturedDoctors() {
  try {
    const featuredDoctors = await prisma.doctor.findMany({
      take: 5,
    });
    console.log(featuredDoctors);
  } catch (error) {
    console.error('Error fetching featured doctors:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testFetchFeaturedDoctors();