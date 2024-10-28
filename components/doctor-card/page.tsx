'use client';

import Image from 'next/image';
import Link from 'next/link';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  imageUrl: string;
}

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <Link href={`/doctors/profile/${doctor.id}`}>
      <div className="bg-white text-black rounded-lg shadow-lg shadow-gray-800/50 p-4 sm:p-6 transform hover:scale-105 transition-transform duration-300 m-4">
        <Image
          src={doctor.imageUrl || '/images/placeholder-doctor-image.jpg'} 
          alt={doctor.name || 'Doctor Image'}
          width={200}
          height={200}
          className="mx-auto object-cover"
        />
        <h3 className="text-xl sm:text-2xl font-bold text-black text-center mt-3 sm:mt-4">{doctor.name}</h3>
        <p className="text-center text-gray-600 text-xl sm:text-base">{doctor.specialty}</p>
        <button className="block mt-4 sm:mt-6 w-full text-center bg-gray-500 hover:bg-custom-green text-white text-base sm:text-lg font-bold py-2 sm:py-3 rounded-lg shadow-lg shadow-gray-800/50 active:translate-y-0.5 active:shadow-md transition-all duration-150">
          View Profile
        </button>
      </div>
    </Link>
  );
};

export default DoctorCard;