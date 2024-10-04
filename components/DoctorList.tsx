'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Doctor } from '@/lib/types';

interface DoctorListProps {
  initialDoctors: Doctor[];
}

export default function DoctorsList({ initialDoctors }: DoctorListProps) {
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);

  useEffect(() => {
    setDoctors(initialDoctors);
  }, [initialDoctors]);

  if (!doctors || doctors.length === 0) {
    return <p className="text-center">No doctors found.</p>;
  }

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {doctors.map((doctor) => (
        <li key={doctor.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
          <Link href={`/doctors/${doctor.id}`}>
            <div className="p-6">
              {doctor.imageUrl && (
                <Image
                  src={doctor.imageUrl}
                  alt={doctor.name}
                  width={100}
                  height={100}
                  className="rounded-full mx-auto mb-4"
                />
              )}
              <h2 className="text-xl font-semibold text-center">{doctor.name}</h2>
              <p className="text-gray-600 text-center">{doctor.specialty}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}