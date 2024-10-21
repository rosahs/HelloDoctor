import Image from 'next/image';
import Link from 'next/link';
import { MapPin } from 'lucide-react';

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

interface DoctorCardProps {
  doctor: Doctor;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <Link href={`/doctors/profile/${doctor.id}/reserve`} passHref>
      <div className="bg-white text-black rounded-lg shadow-lg p-4 sm:p-6 transform hover:scale-105 transition-transform duration-300 cursor-pointer">
        <Image
          src={doctor.imageUrl || "/images/placeholder-doctor-image.jpg"}
          alt={doctor.name}
          width={200}
          height={200}
          className="mx-auto object-cover rounded-full"
          unoptimized
        />
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 text-center mt-3 sm:mt-4">{doctor.name}</h3>
        <p className="text-center text-gray-600 text-sm sm:text-base">{doctor.specialty}</p>

        <div className="flex justify-center text-gray-600 items-center mt-3 sm:mt-4">
          <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 mr-2" />
          <span className="text-sm sm:text-base">{doctor.location}</span>
        </div>
      </div>
    </Link>
  );
}