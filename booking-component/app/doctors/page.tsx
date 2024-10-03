'use client'

import { useState, useEffect } from 'react';
import { Doctor } from '@/lib/types';
import Link from 'next/link';
import DoctorsList from '@/components/DoctorList';
import { getDoctors } from '@/lib/api/getDoctors';

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDoctors() {
      try {
        const data = await getDoctors();
        setDoctors(data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setError('Failed to fetch doctors. Please try again later.');
      }
    }
    fetchDoctors();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">Our Doctors</h1>
      <DoctorsList initialDoctors={doctors} />
      <div className="mt-12 text-center">
        <Link href="/" className="bg-gray-500 text-white py-2 px-6 rounded-full hover:bg-gray-600 transition duration-300">
          Back to Home
        </Link>
      </div>
    </div>
  );
}