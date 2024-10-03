'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Doctor } from '@/lib/types';
import { MessageSquare, Calendar, User, Image as ImageIcon, MapPin, Star, Home } from 'lucide-react';

const dummyData: Partial<Doctor> = {
  imageUrl: "/default-doctor-image.jpg",  // Update this line
  name: "Dr. Razha",
  specialty: "Cardiologist | Internal Medicine Specialist",
  about: "Whether you're a patient looking for quality care or a doctor wanting to expand your reach, DocFinder has you covered.",
  specialties: ["Cardiology", "Internal Medicine", "Heart Failure Management"],
  certifications: [
    "American Board of Internal Medicine (ABIM) - Certified in Cardiovascular Disease",
    "Advanced Cardiovascular Life Support (ACLS)",
    "Basic Life Support (BLS)"
  ],
  professionalExperience: ["Cardiology", "Internal Medicine", "Heart Failure Management"],
  languages: ["English (Fluent)", "Kurdish (Conversational)"]
};

export default function DynamicDoctorProfile({ initialDoctor, id }: { initialDoctor: Doctor, id: string }) {
  const [doctor, setDoctor] = useState<Doctor>({ ...dummyData, ...initialDoctor } as Doctor);

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Image
              src={doctor.imageUrl || dummyData.imageUrl!}
              alt={doctor.name}
              width={60}
              height={60}
              className="rounded-full mr-3"
            />
            <div>
              <h1 className="text-xl font-bold">{doctor.name}</h1>
              <p className="text-sm text-gray-600">{doctor.specialty || dummyData.specialty}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="text-gray-600">🔖</button>
            <button className="text-gray-600">☰</button>
          </div>
        </div>

        <div className="flex mb-4">
          <Link href={`/doctors/${id}/message`} className="flex-1 bg-black text-white py-2 px-4 text-center mr-2">
            Message
          </Link>
          <Link href={`/doctors/${id}/book`} className="flex-1 bg-black text-white py-2 px-4 text-center">
            Reserve
          </Link>
        </div>

        <div className="flex justify-between mb-4 border-t border-b py-2">
          <button className="text-gray-600"><User size={20} /></button>
          <button className="text-gray-600"><ImageIcon size={20} /></button>
          <button className="text-gray-600"><MapPin size={20} /></button>
          <button className="text-gray-600"><Star size={20} /></button>
        </div>

        <section className="mb-4">
          <h2 className="text-lg font-bold mb-2">About me</h2>
          <p className="text-sm">{doctor.about || dummyData.about}</p>
        </section>

        <section className="mb-4">
          <h2 className="text-lg font-bold mb-2">Specialties</h2>
          <ul className="list-disc list-inside">
            {(doctor.specialties || dummyData.specialties)?.map((specialty, index) => (
              <li key={index} className="text-sm">{specialty}</li>
            ))}
          </ul>
        </section>

        <section className="mb-4">
          <h2 className="text-lg font-bold mb-2">Certifications</h2>
          <ul className="list-disc list-inside">
            {(doctor.certifications || dummyData.certifications)?.map((certification, index) => (
              <li key={index} className="text-sm">{certification}</li>
            ))}
          </ul>
        </section>

        <section className="mb-4">
          <h2 className="text-lg font-bold mb-2">Professional Experience</h2>
          <ul className="list-disc list-inside">
            {(doctor.professionalExperience || dummyData.professionalExperience)?.map((experience, index) => (
              <li key={index} className="text-sm">{experience}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-2">Languages</h2>
          <ul className="list-disc list-inside">
            {(doctor.languages || dummyData.languages)?.map((language, index) => (
              <li key={index} className="text-sm">{language}</li>
            ))}
          </ul>
        </section>

        {/* Add this new section at the bottom, after all other sections */}
        <div className="mt-8 flex justify-between">
          <Link 
            href="/"
            className="flex items-center justify-center bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300"
          >
            <Home size={20} className="mr-2" />
            Back Home
          </Link>
          <Link 
            href={`/doctors/${id}/message`}
            className="flex items-center justify-center bg-black text-white py-2 px-4 rounded-full hover:bg-yellow-600 transition duration-300"
          >
            <MessageSquare size={20} className="mr-2" />
            Message
          </Link>
          <Link 
            href={`/doctors/${id}/book`}
            className="flex items-center justify-center bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition duration-300"
          >
            <Calendar size={20} className="mr-2" />
            Book
          </Link>
        </div>
      </div>
    </div>
  );
}