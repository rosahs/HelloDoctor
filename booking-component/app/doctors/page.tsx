import Link from 'next/link';
import { getDoctors } from '@/lib/api/getDoctors';
import { Doctor } from '@/lib/types';

export default async function DoctorsPage() {
  let doctors: Doctor[] = [];
  try {
    doctors = await getDoctors();
  } catch (error) {
    console.error('Error fetching doctors:', error);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">Our Doctors</h1>
      {doctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {doctors.map((doctor) => (
            <Link key={doctor.id} href={`/doctors/${doctor.id}`}>
              <div className="border p-4 rounded-lg hover:shadow-lg transition-shadow">
                <h2 className="text-xl font-semibold">{doctor.name}</h2>
                <p>{doctor.specialty}</p>
                <p>Experience: {doctor.experience} years</p>
                <p>Rating: {doctor.rating}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>No doctors available at the moment. Please try again later.</p>
      )}
      <Link href="/" className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Back to Home
      </Link>
    </main>
  );
}