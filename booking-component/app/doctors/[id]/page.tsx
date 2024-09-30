// app/doctors/page.tsx
import { getDoctors } from '@/lib/api/getDoctors';
import { Doctor } from '@/lib/api/types'
import Link from 'next/link';

export default async function DoctorsPage() {
  try {
    console.log('Fetching doctors in DoctorsPage');
    const doctors = await getDoctors();
    console.log('Doctors fetched successfully:', doctors);

    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Our Doctors</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="border p-4 rounded-lg">
              <h2 className="text-xl font-semibold">{doctor.name}</h2>
              <p>{doctor.specialty}</p>
              <p>{doctor.experience} years experience</p>
              <p>Rating: {doctor.rating}</p>
              <Link href={`/doctors/${doctor.id}`} className="text-blue-500 hover:underline">
                View Profile
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in DoctorsPage:', error);
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p>Failed to load doctors. Please try again later.</p>
        <p>Error details: {(error as Error).message}</p>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }
}