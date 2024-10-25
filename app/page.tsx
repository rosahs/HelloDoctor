'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin } from 'lucide-react'; 
import DoctorSearchForm from '@/components/DoctorSearchForm/page';
import Footer from '@/components/footer/page'
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
      <div className="fixed inset-0 bg-cover bg-center z-0" style={{ backgroundImage: "url('/images/steth.png')" }}></div>
      <div className="fixed inset-0 bg-black bg-opacity-0 z-1"></div>
      <div className="relative z-10 flex flex-col items-center justify-start min-h-screen px-4 sm:px-6 text-white overflow-y-auto">
        <div className="w-full max-w-6xl mt-16 sm:mt-24">
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-center mb-4 sm:mb-8 leading-tight tracking-wide">
  Find Your <span className="text-blue-900 weight-bold text-4xl sm:text-6xl md:text-7xl">Doctor</span> <br />
  Anywhere in the <span style={{ display: 'inline-flex', alignItems: 'center' }}>
    W<span style={{ display: 'inline-block', width: 0 }} />
    <Image 
      src="/images/globenobg2.png" 
      alt="World" 
      width={150} 
      height={150} 
      className="inline-block align-middle" 
      style={{ margin: '0 -10px' }} // Reducing the space between W and the globe
    />
    <span style={{ display: 'inline-block', width: 0 }} />
    rld
  </span>
</h1>
          <p className="text-lg sm:text-2xl md:text-3xl text-gray-300 text-center mb-6 sm:mb-8 max-w-3xl mx-auto">
            Connect with trusted doctors worldwide, access affordable medical care, and find the right specialist wherever you are.
          </p>

          <div className="w-full max-w-4xl mb-8 sm:mb-12 mx-auto">
            <DoctorSearchForm />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12">
            Featured Doctors
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="bg-white bg-opacity-80 text-black rounded-lg shadow-lg p-4 sm:p-6 transform hover:scale-105 transition-transform duration-300">
                <Image
                    src={doctor.imageUrl ? doctor.imageUrl : '/images/placeholder-doctor-image.jpg'}
                    alt={doctor.name ? doctor.name : 'Doctor'}
                    width={200}
                    height={200}
                    className="mx-auto object-cover"
                />
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 text-center mt-3 sm:mt-4">{doctor.name}</h3>
                <p className="text-center text-gray-600 text-sm sm:text-base">{doctor.specialty}</p>

                <div className="flex justify-center text-gray-600 items-center mt-3 sm:mt-4">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 mr-2" />
                  <span className="text-sm sm:text-base">{doctor.location}</span>
                </div>

                <Link href={`/doctors/profile/${doctor.id}`}>
                  <button className="block mt-4 sm:mt-6 w-full text-center bg-gray-900 hover:bg-blue-800 text-white text-base sm:text-lg font-bold py-2 sm:py-3 rounded-lg">
                    View Profile
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 w-full">
          <Footer />
        </div>
      </div>
    </div>
  );
}