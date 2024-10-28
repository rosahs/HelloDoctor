import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = new URL(request.url).searchParams;
  const name = searchParams.get('name') || undefined;
  const specialization = searchParams.get('specialization') || undefined;

  try {
    const doctors = await db.doctor.findMany({
      where: {
        user: name ? { name: { contains: name, mode: 'insensitive' } } : undefined,
        specialization: specialization
          ? { contains: specialization, mode: 'insensitive' }
          : undefined,
      },
      select: {
        id: true,
        specialization: true,
        images: true, 
        user: {
          select: {
            name: true,
          }
        }
      }
    });

    const formattedDoctors = doctors.map((doctor) => ({
      id: doctor.id,
      name: doctor.user?.name ?? 'No name available',
      specialization: doctor.specialization ?? 'General Practitioner',
      imageUrl: doctor.images?.[0] ?? '/images/placeholder-doctor-image.jpg',
      profileUrl: `/doctors/${doctor.specialization?.toLowerCase().replace(/ /g, '-')}/${doctor.id}`,
    }));

    console.log("Formatted Doctors:", formattedDoctors);

    return NextResponse.json(formattedDoctors);
  } catch (error) {
    console.error('Failed to fetch doctors:', error);
    return NextResponse.json({ error: 'Failed to fetch doctors' }, { status: 500 });
  } finally {
    await db.$disconnect();
  }
}