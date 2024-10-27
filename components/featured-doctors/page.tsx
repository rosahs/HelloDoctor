'use client'

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getFeaturedDoctors } from '@/lib/doctors';
import { Doctor } from '@/lib/doctors';
import { useRouter } from 'next/navigation';
import MessageButton from '@/components/MessageButton';

export default function FeaturedDoctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await getFeaturedDoctors();
        console.log("Fetched Featured Doctors Data:", data); // Add this log for debugging
        setDoctors(data);
      } catch (error) {
        console.error("Failed to fetch featured doctors:", error);
      }
    };
    
    fetchDoctors();
  }, []);

  // Check if doctors data is empty
  if (doctors.length === 0) {
    return <p className="text-center text-gray-500 mt-8">No featured doctors available at this time.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {doctors.map((doctor) => (
        <div key={doctor.id} className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300">
          <Link href={`/doctors/profile/${doctor.id}`} passHref>
            <Image
              src={doctor.images && doctor.images[0] ? doctor.images[0] : '/images/placeholder-doctor-image.jpg'}
              alt={`Doctor specializing in ${doctor.specialization || 'General Medicine'}`}
              width={300}
              height={200}
              className="w-full h-48 object-cover"
            />
          </Link>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{doctor.user?.name || 'Name not available'}</h2>
            <p className="text-gray-500 text-sm mb-2 line-clamp-3">{doctor.specialization || 'Not specified'}</p>
            <div className="flex space-x-4 mt-4">
              <MessageButton doctorId={doctor.id} />
              <button
                className="flex-1 bg-black px-3 text-white h-10 rounded-md font-semibold text-lg hover:bg-blue-800 transition-colors duration-300"
                onClick={() => router.push(`/doctors/profile/${doctor.id}/reserve`)}
              >
                Reserve
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}