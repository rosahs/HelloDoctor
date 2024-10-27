import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const doctorId = params.id;
    
    try {
        const doctor = await db.doctor.findUnique({
            where: { id: doctorId },
            select: {
                id: true,

                user: {
                    select: { name: true, image: true },
                },
                specialization: true,
                images: true,
                aboutMe: true,
                specialties: true,
                certifications: true,
                professionalExperience: true,
                languages: true,
            },
        });

        if (!doctor) {
            return NextResponse.json({ error: 'Doctor not found' }, { status: 404 });
        }

        console.log("raw data", doctor);
        

        const formattedDoctor = {
            id: doctor.id,
            name: doctor.user?.name || 'Unknown',
            specialization: doctor.specialization || 'Not specified',
            specialties: doctor.specialties || 'Not specified',
            imageUrl: doctor.images?.[0] || '/images/placeholder-doctor-image.jpg',
            about: doctor.aboutMe || '',
            certifications: doctor.certifications?.split(',') || [],
            experience: doctor.professionalExperience?.split(',') || [],
            languages: doctor.languages?.split(',') || [],
        };

        return NextResponse.json(formattedDoctor);
    } catch (error) {
        console.error('Error fetching doctor:', error);
        return NextResponse.json({ error: 'Failed to fetch doctor' }, { status: 500 });
    }
}