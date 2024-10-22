'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import DoctorSearchForm from '@/components/DoctorSearchForm/page';
import DoctorCard from '@/components/doctor-card/page';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  location: string;
  imageUrl: string;
  about: string;
  experience: string;
  languages: string;
  rating: string;
}

export default function DoctorProfilePage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('/api/doctors/featured');
        if (response.ok) {
          const data = await response.json();
          setDoctors(data);
        } else {
          console.error('Failed to fetch featured doctors');
        }
      } catch (error) {
        console.error('Error fetching featured doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-black bg-opacity-70 z-1"></div>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 text-white">
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-center mb-4 sm:mb-8 leading-tight tracking-wide">
          Find Your Doctor <br />
          Anywhere in the W🌍rld
        </h1>
        <p className="text-lg sm:text-2xl md:text-3xl text-gray-300 text-center mb-6 sm:mb-8 max-w-3xl">
          Connect with trusted doctors worldwide, access affordable medical care, and find the right specialist wherever you are.
        </p>

        <div className="w-full max-w-4xl mb-8 sm:mb-12">
          <Link href="/doctors/search">
            <DoctorSearchForm />
          </Link>
        </div>

        <div className="w-full max-w-6xl mt-8 sm:mt-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12">
            Featured Doctors
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}