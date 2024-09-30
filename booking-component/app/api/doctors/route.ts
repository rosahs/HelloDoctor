import { NextResponse } from 'next/server';
import { Doctor } from '@/lib/types';

export async function GET() {
  try {
    // Simulate database fetch with a delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const doctors: Doctor[] = [
      { id: '1', name: 'Dr. Smith', specialty: 'Cardiology', experience: 10, rating: 4.5 },
      { id: '2', name: 'Dr. Johnson', specialty: 'Pediatrics', experience: 8, rating: 4.2 },
      { id: '3', name: 'Dr. Williams', specialty: 'Neurology', experience: 15, rating: 4.8 },
      { id: '4', name: 'Dr. Brown', specialty: 'Orthopedics', experience: 12, rating: 4.6 },
    ];
    return NextResponse.json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return NextResponse.json({ error: 'Failed to fetch doctors' }, { status: 500 });
  }
}


// import { NextResponse } from 'next/server';
// import { Doctor } from '@/lib/api/types';

// export async function GET() {
//   const doctors: Doctor[] = [
//     { id: 1, name: 'Dr. Smith', specialty: 'Cardiology', experience: 10, rating: 4.5, appointmentDuration: 30 },
//     { id: 2, name: 'Dr. Johnson', specialty: 'Pediatrics', experience: 8, rating: 4.2, appointmentDuration: 25 },
//     { id: 3, name: 'Dr. Williams', specialty: 'Neurology', experience: 15, rating: 4.8, appointmentDuration: 45 },
//     { id: 4, name: 'Dr. Brown', specialty: 'Orthopedics', experience: 12, rating: 4.6, appointmentDuration: 35 },
//   ];

//   return NextResponse.json(doctors);
// }

