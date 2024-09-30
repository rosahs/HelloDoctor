'use client'

import Link from 'next/link';
import { Doctor } from '@/lib/api/types';
import { useState, useEffect } from 'react';

interface DoctorListProps {
  initialDoctors: Doctor[];
}

export default function DoctorList({ initialDoctors }: DoctorListProps) {
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setDoctors(initialDoctors);
    setIsLoading(false);
  }, [initialDoctors]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {doctors.map((doctor) => (
        <li key={doctor.id}>
          <Link href={`/doctor/${doctor.id}`}>
            <div>
              <h3>{doctor.name}</h3>
              <p>{doctor.specialty}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}