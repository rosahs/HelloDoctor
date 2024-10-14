'use server'


import Image from 'next/image';
import { getDoctorById } from '@/data/doctor'; 
import DoctorProfileDetails from '@/components/DoctorProfileDetails/page'

// This is the server-side part of the doctor profile page
export default async function DoctorProfilePage({ params }: { params: { id: string } }) {
  const doctor = await getDoctorById(params.id);

  if (!doctor) {
    return <p>Doctor not found.</p>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow p-6">
        <div className="w-full max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Image
                src={doctor.imageUrl || '/images/placeholder-doctor-image.jpg'}
                alt={doctor.name}
                width={100}
                height={100}
                className="rounded-full"
              />
              <div className="ml-6">
                <h2 className="font-bold text-2xl">{doctor.name}</h2>
                <p className="text-gray-600 text-xl">{doctor.specialty}</p>
              </div>
            </div>
          </div>

          {/* Doctor details */}
          <DoctorProfileDetails doctor={doctor} />
        </div>
      </div>
    </div>
  );
}

// Move the interactive part into a client component