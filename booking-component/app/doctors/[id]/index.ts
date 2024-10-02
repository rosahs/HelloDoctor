import { NextResponse } from 'next/server';
import { Doctor } from '@/lib/types';

export async function GET() {
  try {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const doctors: Doctor[] = [
      {
        id: '1',
        name: 'Dr. Razha',
        specialty: 'Cardiology',
        experience: 10,
        rating: 4.5,
        imageUrl: '/Dr_Razha.jpg',
        about: 'Whether you\'re a patient looking for quality care or a doctor wanting to expand your reach, DocFinder has you covered.',
        specialties: ['Cardiology', 'Internal Medicine', 'Heart Failure Management'],
        certifications: [
          'American Board of Internal Medicine (ABIM) - Certified in Cardiovascular Disease',
          // ... other certifications ...
        ],
        professionalExperience: ['Cardiology', 'Internal Medicine', 'Heart Failure Management'],
        languages: ['English (Fluent)', 'Kurdish (Conversational)']
      },
      {
        id: '2',
        name: 'Dr. Johnson',
        specialty: 'Pediatrics',
        experience: 8,
        rating: 4.2,
        imageUrl: '/dr-johnson.jpg',
        about: 'Dedicated pediatrician with a focus on child development and preventive care.',
        specialties: ['Pediatrics', 'Child Development', 'Preventive Care'],
        certifications: [
          'American Board of Pediatrics',
          'Pediatric Advanced Life Support (PALS)'
        ],
        professionalExperience: ['General Pediatrics', 'Neonatal Care'],
        languages: ['English (Fluent)', 'Spanish (Conversational)']
      },
  
    ];
    return NextResponse.json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return NextResponse.json({ error: 'Failed to fetch doctors' }, { status: 500 });
  }
}