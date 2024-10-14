'use client'; 

import { useRouter } from 'next/navigation';
import { MessageSquare, Bookmark } from 'lucide-react';
import Link from 'next/link';

const DoctorProfileDetails = ({ doctor }: { doctor: any }) => {
  const router = useRouter();

  return (
    <div>
      {/* Back Button */}
      <div className="mb-6">
        <button onClick={() => router.back()} className="text-green-800 text-2xl">
          ← Back
        </button>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mb-6">
        <button className="w-1/2 h-16 bg-black text-white text-2xl p-3 rounded-md mr-4">
          <MessageSquare className="inline-block mr-2" /> Message
        </button>
        <Link href={`/appointments/doctor-list/${doctor.id}/reserve`} className="w-1/2">
          <button className="w-full h-16 bg-black text-white text-2xl p-3 rounded-md">
            Reserve
          </button>
        </Link>
      </div>

      {/* Doctor Info */}
      <div className="mb-6">
        <h3 className="font-bold text-2xl">About me</h3>
        <p className="text-gray-600 text-xl">{doctor.aboutMe || 'No information available.'}</p>
      </div>

      {/* Specialties */}
      <div className="mb-6">
        <h3 className="font-bold text-2xl">Specialties</h3>
        <ul className="list-disc ml-5 text-gray-600 text-xl">
          {doctor.specialties
            ? doctor.specialties.split(',').map((specialty: string, index: number) => (
                <li key={index}>{specialty}</li>
              ))
            : <li>No specialties listed.</li>}
        </ul>
      </div>

      {/* Certifications */}
      <div className="mb-6">
        <h3 className="font-bold text-2xl">Certifications</h3>
        <ul className="list-disc ml-5 text-gray-600 text-xl">
          {doctor.certifications
            ? doctor.certifications.split(',').map((cert: string, index: number) => (
                <li key={index}>{cert}</li>
              ))
            : <li>No certifications listed.</li>}
        </ul>
      </div>

      {/* Languages */}
      <div>
        <h3 className="font-bold text-2xl">Languages</h3>
        <ul className="list-disc ml-5 text-gray-600 text-xl">
          {doctor.languages
            ? doctor.languages.split(',').map((language: string, index: number) => (
                <li key={index}>{language}</li>
              ))
            : <li>No languages listed.</li>}
        </ul>
      </div>
    </div>
  );
};

export default DoctorProfileDetails;