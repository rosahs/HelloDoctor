'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getDoctors } from '@/lib/api/getDoctors';
import { Doctor } from '@/lib/types';

export default function DynamicDoctorProfile({ initialDoctor, id }: { initialDoctor: Doctor, id: string }) {
  const [doctor, setDoctor] = useState<Doctor | null>(initialDoctor);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('initialDoctor:', initialDoctor);
    console.log('id:', id);
    if (!initialDoctor) {
      setLoading(true);
      getDoctors()
        .then(data => {
          console.log('Fetched doctors:', data);
          if (Array.isArray(data)) {
            const foundDoctor = data.find(d => d.id.toString() === id);
            console.log('Found doctor:', foundDoctor);
            if (foundDoctor) {
              setDoctor(foundDoctor);
            } else {
              throw new Error('Doctor not found');
            }
          } else {
            throw new Error('Invalid data format received');
          }
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching doctor:', err);
          setError(err.message);
          setLoading(false);
        });
    }
  }, [id, initialDoctor]);

  if (loading) {
    return <p className="text-center">Loading doctor profile...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  if (!doctor) {
    return <p className="text-center">Doctor not found</p>;
  }

  return (
    <div className="flex flex-col items-center bg-white rounded-3xl shadow-lg overflow-hidden p-6">
      <h1 className="text-3xl font-bold mb-2">{doctor.name}</h1>
      <p className="text-gray-600 mb-4">{doctor.specialty}</p>
      <p className="mb-4">{doctor.yearsOfExperience} years of experience</p>
      
      <Link 
        href="/doctors" 
        className="mb-6 bg-gray-500 text-white py-2 px-4 rounded-full hover:bg-gray-600 transition duration-300"
      >
        Back to Doctors List
      </Link>
      
      <div className="w-full flex space-x-4 mt-auto">
        <Link 
          href={`/doctors/${id}/message`}
          className="flex-1 bg-blue-600 text-white py-3 text-center rounded-full"
        >
          Message
        </Link>
        <Link 
          href={`/doctors/${id}/book`}
          className="flex-1 bg-blue-600 text-white py-3 text-center rounded-full"
        >
          Book Appointment
        </Link>
      </div>
    </div>
  );
}