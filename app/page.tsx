'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin } from 'lucide-react'; 
import DoctorSearchForm from '@/components/DoctorSearchForm/page';
// import './HomePage.css';

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

export default function HomePage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    // Fetch featured doctors from the backend
    const fetchDoctors = async () => {
      try {
        const response = await fetch('/api/doctors/featured'); // Update this endpoint to match your backend
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
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {/* <Image
          src="/images/mapimage9.png"
          alt="World Map"
          fill
          style={{ objectFit: 'cover' }}
          quality={100}
          className="opacity-80"
          priority
        /> */}
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70 z-1"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 text-white">
        {/* Heading with Flag Background Letters */}
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-center mb-4 sm:mb-8 leading-tight tracking-wide">
          Find Your Doctor <br />
          Anywhere None in the W🌍rld
        </h1>
        <p className="text-lg sm:text-2xl md:text-3xl text-gray-300 text-center mb-6 sm:mb-8 max-w-3xl">
          Connect with trusted doctors worldwide, access affordable medical care, and find the right specialist wherever you are.
        </p>

        {/* Doctor Search Form */}
        <div className="w-full max-w-4xl mb-8 sm:mb-12">
          <Link href="/doctors/search">
            <DoctorSearchForm />
          </Link>
        </div>

        {/* Featured Doctors Section */}
        <div className="w-full max-w-6xl mt-8 sm:mt-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12">
            Featured Doctors
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="bg-white text-black rounded-lg shadow-lg p-4 sm:p-6 transform hover:scale-105 transition-transform duration-300">
                <Image
                  src={doctor.imageUrl} 
                  alt={doctor.name}
                  width={200}
                  height={200}
                  className="mx-auto object-cover"
                />
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 text-center mt-3 sm:mt-4">{doctor.name}</h3>
                <p className="text-center text-gray-600 text-sm sm:text-base">{doctor.specialty}</p>
                
                {/* Location Section with Icon */}
                <div className="flex justify-center text-gray-600 items-center mt-3 sm:mt-4">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 mr-2" />
                  <span className="text-sm sm:text-base">{doctor.location}</span>
                </div>

                <Link href={`/doctors/${doctor.id}`}>
                  <button className="block mt-4 sm:mt-6 w-full text-center bg-blue-600 hover:bg-green-600 text-white text-base sm:text-lg font-bold py-2 sm:py-3 rounded-lg">
                    Book Now
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}