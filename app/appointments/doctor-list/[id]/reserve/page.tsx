'use client';

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { MessageSquare, Bookmark, User, Image as ImageIcon, MapPin, Star } from 'lucide-react';
import Footer from "@/components/footer/page";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function DoctorReservePage() {
  const params = useParams();
  const router = useRouter();
  const doctorId = params.id as string;
  
  const [doctor, setDoctor] = useState<any | null>(null); // State to hold doctor data
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  // Fetch doctor data from API
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await fetch(`/api/doctors/${doctorId}`);
        const data = await response.json();
        setDoctor(data); // Set the doctor data
      } catch (error) {
        console.error('Failed to fetch doctor:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [doctorId]);

  // If still loading, show loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // If no doctor is found, show an error message
  if (!doctor) {
    return <div>No doctor found</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow p-6">
        <div className="w-full max-w-6xl mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <button onClick={() => router.back()} className="text-green-800 text-2xl">
              ← Back
            </button>
          </div>

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Image
                src={doctor.images[0]} // Assuming the first image
                alt={doctor.name}
                width={100}
                height={100}
                className="rounded-full"
              />
              <div className="ml-6">
                <h2 className="font-bold text-2xl">{doctor.name}</h2>
                <p className="text-gray-600 text-xl">{doctor.specialization}</p>
              </div>
            </div>
            <Bookmark className="text-gray-800" size={32} />
          </div>

          {/* Buttons */}
          <div className="flex justify-between mb-6">
            <button className="w-1/2 h-16 bg-black text-white text-2xl p-3 rounded-md mr-4">
              <MessageSquare className="inline-block mr-2" /> Message
            </button>
            <Link href={`/appointments/doctor-list/${doctorId}/reserve`} className="w-1/2">
              <button className="w-full h-16 bg-black text-white text-2xl p-3 rounded-md">
                Reserve
              </button>
            </Link>
          </div>

          {/* Section Icons */}
          <div className="flex justify-between mb-6">
            <div className="flex overflow-x-auto">
              <User className="text-gray-800 min-w-[32px] mr-4" size={32} />
              <ImageIcon className="text-gray-800 min-w-[32px] mr-4" size={32} />
              <MapPin className="text-gray-800 min-w-[32px] mr-4" size={32} />
              <Star className="text-gray-800 min-w-[32px]" size={32} />
            </div>
          </div>

          {/* About */}
          <div className="mb-6">
            <h3 className="font-bold text-2xl">About me</h3>
            <p className="text-gray-600 text-xl">{doctor.aboutMe}</p>
          </div>

          {/* Specialties */}
          <div className="mb-6">
            <h3 className="font-bold text-2xl">Specialties</h3>
            <ul className="list-disc ml-5 text-gray-600 text-xl">
              {doctor.specialties?.split(', ').map((specialty: string, index: number) => (
                <li key={index}>{specialty}</li>
              ))}
            </ul>
          </div>

          {/* Certifications */}
          <div className="mb-6">
            <h3 className="font-bold text-2xl">Certifications</h3>
            <ul className="list-disc ml-5 text-gray-600 text-xl">
              {doctor.certifications?.split(', ').map((certification: string, index: number) => (
                <li key={index}>{certification}</li>
              ))}
            </ul>
          </div>

          {/* Professional Experience */}
          <div className="mb-6">
            <h3 className="font-bold text-2xl">Professional Experience</h3>
            <ul className="list-disc ml-5 text-gray-600 text-xl">
              {doctor.professionalExperience?.split(', ').map((exp: string, index: number) => (
                <li key={index}>{exp}</li>
              ))}
            </ul>
          </div>

          {/* Languages */}
          <div>
            <h3 className="font-bold text-2xl">Languages</h3>
            <ul className="list-disc ml-5 text-gray-600 text-xl">
              {doctor.languages?.split(', ').map((language: string, index: number) => (
                <li key={index}>{language}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}