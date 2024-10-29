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
    <div className="bg-[var(--secondary-color)] rounded-3xl shadow-lg p-4 flex flex-col sm:flex-row items-center w-full">
      <div className="relative w-24 sm:w-32 flex-shrink-0 mb-4 sm:mb-0">
        <Image
          src={doctor.imageUrl || '/images/placeholder-doctor-image.jpg'}
          alt={doctor.name || 'Doctor Image'} 
          width={120}
          height={120}
          className="rounded-full object-cover z-10 w-full h-auto"
        />
      </div>
      <div className="sm:ml-4 flex flex-col flex-grow w-full text-center sm:text-left">
        <h3 className="text-lg sm:text-xl font-bold text-[var(--primary-color)]">{doctor.name}</h3>
        <p className="text-gray-600 text-xs sm:text-sm">{doctor.specialty}</p>
        <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3 sm:mt-4">
          <Link href={`/doctors/profile/${doctor.id}`}>
            <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#4285F4] text-white rounded-full text-xs sm:text-sm hover:bg-[#1a73e8] transition-colors">
              Info
            </button>
          </Link>
          <button className="p-1.5 sm:p-2 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
            <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
          </button>
          <button className="p-1.5 sm:p-2 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
            <InfoIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
          </button>
          <button className="p-1.5 sm:p-2 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
            <HeartIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);
const InfoIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const HeartIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

export default DoctorCard;