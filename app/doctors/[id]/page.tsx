'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Bookmark, MessageSquare, User, Image as ImageIcon, MapPin, Star } from 'lucide-react';
import { Avatar } from "@/components/ui/avatar";
import Footer from '@/components/footer/page';

interface DoctorProfile {
  id: string;
  name: string;
  specialty: string;
  location: string;
  imageUrl: string;
  about: string;
  certifications: string[];
  specialties?: string[];
  experience?: string[];
  languages?: string[];
}

export default function DoctorProfilePage() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState<DoctorProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await fetch(`/api/doctors/${id}`);
        if (response.ok) {
          const data = await response.json();
          setDoctor(data);
        } else {
          console.error('Failed to fetch doctor details');
        }
      } catch (error) {
        console.error('Error fetching doctor details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDoctor();
    }
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!doctor) {
    return <p>Doctor not found.</p>;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col w-full px-8 py-12">
      <div className="w-full flex-grow space-y-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start justify-between mb-8 w-full">
          <div className="flex items-start mb-6 md:mb-0">
            <Avatar className="w-32 h-32 mr-6">
              <Image
                src={doctor.imageUrl || '/images/placeholder-doctor-image.jpg'}
                alt={`${doctor.name}'s profile picture`}
                width={150}
                height={150}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = '/images/placeholder-doctor-image.jpg';
                }}
              />
            </Avatar>
            <div className="ml-4 text-left">
              <h2 className="text-3xl md:text-4xl font-bold">{doctor.name}</h2>
              <p className="text-xl md:text-2xl font-semibold text-gray-600">{doctor.specialty}</p>
            </div>
          </div>
          <Bookmark className="text-gray-800 cursor-pointer" size={40} />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-8 w-full">
          <Link href={`/doctors/${doctor.id}/message`} className="w-full md:w-full">
            <button className="w-full h-16 bg-black text-white text-lg md:text-2xl font-semibold rounded-md flex items-center justify-center transition-colors duration-300 hover:bg-green-600 cursor-pointer">
              <MessageSquare className="mr-3" size={32} /> Message
            </button>
          </Link>
          <Link href={`/doctors/${doctor.id}/reserve`} className="w-full md:w-full">
            <button className="w-full h-16 bg-black text-white text-lg md:text-2xl font-semibold rounded-md flex items-center justify-center transition-colors duration-300 hover:bg-green-600 cursor-pointer">
              <Star className="mr-3" size={32} /> Reserve
            </button>
        </Link>
        </div>

        {/* Icons Row */}
        <div className="flex justify-between mb-8 p-6 rounded-md bg-gray-100 w-full">
          <User className="text-gray-800 cursor-pointer" size={32} />
          <ImageIcon className="text-gray-800 cursor-pointer" size={32} />
          <MapPin className="text-gray-800 cursor-pointer" size={32} />
          <Star className="text-gray-800 cursor-pointer" size={32} />
        </div>

        {/* Categories Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* About Section */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 className="font-bold text-2xl mb-4">About me</h3>
            <p className="text-lg text-gray-600">{doctor.about || 'No information available.'}</p>
          </div>

          {/* Specialties */}
          {doctor.specialties && doctor.specialties.length > 0 && (
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-2xl mb-4">Specialties</h3>
              <ul className="list-disc pl-5 text-lg text-gray-600">
                {doctor.specialties.map((specialty, index) => <li key={index}>{specialty}</li>)}
              </ul>
            </div>
          )}

          {/* Certifications */}
          {doctor.certifications && doctor.certifications.length > 0 && (
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-2xl mb-4">Certifications</h3>
              <ul className="list-disc pl-5 text-lg text-gray-600">
                {doctor.certifications.map((certification, index) => <li key={index}>{certification}</li>)}
              </ul>
            </div>
          )}

          {/* Professional Experience */}
          {doctor.experience && doctor.experience.length > 0 && (
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-2xl mb-4">Professional Experience</h3>
              <ul className="list-disc pl-5 text-lg text-gray-600">
                {doctor.experience.map((exp, index) => <li key={index}>{exp}</li>)}
              </ul>
            </div>
          )}

          {/* Languages */}
          {doctor.languages && doctor.languages.length > 0 && (
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-2xl mb-4">Languages</h3>
              <ul className="list-disc pl-5 text-lg text-gray-600">
                {doctor.languages.map((language, index) => <li key={index}>{language}</li>)}
              </ul>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}