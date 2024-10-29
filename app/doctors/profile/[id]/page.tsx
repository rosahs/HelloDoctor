"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "next-auth";
import { Search, Clock, Home, MessageCircle, User as UserIcon, Calendar, ChevronLeft } from 'lucide-react';

interface Doctor {
  id: string;
  user: User;
  name: string;
  specialization: string;
  imageUrl: string;
  about: string;
  specialties: string[];
  certifications: string[];
  experience: string[];
  languages: string[];
}

export default function DoctorProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchDoctor = async () => {
      if (params.id) {
        try {
          const res = await fetch(`/api/doctors/profile/${params.id}`);
          const data = await res.json();
          setDoctor(data);
        } catch (error) {
          console.error('Error fetching doctor:', error);
        }
      }
    };

    fetchDoctor();
  }, [params.id]);

  if (!doctor) {
    return <div>Loading...</div>;
  }

  const handleScheduleClick = () => {
    router.push(`/doctors/profile/${params.id}/reserve`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b">
        <button 
          onClick={() => router.back()}
          className="text-[var(--primary-color)]"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-semibold text-[var(--primary-color)]">Doctor Info</h1>
        <div className="flex gap-2">
          <button className="text-[var(--primary-color)]">
            <Search className="w-5 h-5" />
          </button>
          <button className="text-[var(--primary-color)]">
            <MessageCircle className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-4">
        {/* Doctor Card */}
        <div className="bg-[var(--secondary-color)] rounded-xl p-6 mt-4">
          <div className="flex gap-6">
            <div className="w-1/3">
              <img
                src={doctor.imageUrl || '/api/placeholder/200/200'}
                alt={doctor.name}
                className="w-64 h-64 rounded-full object-cover"
              />
            </div>
            <div className="w-2/3">
              <div className="text-left">
                <h2 className="text-[var(--primary-color)] text-3xl font-bold mb-2">{doctor.name}</h2>
                <p className="text-gray-600 text-xl font-semibold">{doctor.specialization}</p>
              </div>
            </div>
          </div>
          <div className="w-2/3">
            <div className="text-left">
              
              {/* Schedule Container */}
              <div className="bg-white rounded-lg p-4 shadow-sm mt-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <span className="ml-2 text-gray-600">40</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Mon-Sat / 9:00AM - 5:00PM
                  </div>
                </div>
                <div className="flex">
                  <button 
                    onClick={handleScheduleClick}
                    className="bg-[var(--primary-color)] text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
                  >
                    Schedule
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Sections */}
        <div className="mt-6 space-y-6">
          <section>
            <h3 className="text-[var(--primary-color)] text-lg font-semibold mb-2">Profile</h3>
            <p className="text-gray-600">{doctor.about}</p>
          </section>

          <section>
            <h3 className="text-[var(--primary-color)] text-lg font-semibold mb-2">Focus</h3>
            <div className="text-gray-600">
              <p>{doctor.about}</p>
            </div>
          </section>

          <section>
            <h3 className="text-[var(--primary-color)] text-lg font-semibold mb-2">Experience</h3>
            <div className="text-gray-600">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4" />
                <span>15 years experience</span>
              </div>
              {doctor.experience?.map((exp, index) => (
                <p key={index} className="mb-2">{exp}</p>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-[var(--primary-color)] text-lg font-semibold mb-2">Career Path</h3>
            <div className="text-gray-600">
              {doctor.experience?.map((exp, index) => (
                <p key={index} className="mb-2">{exp}</p>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-[var(--primary-color)] text-lg font-semibold mb-2">Highlights</h3>
            <div className="text-gray-600">
              {doctor.specialties?.map((specialty, index) => (
                <p key={index} className="mb-2">{specialty.trim()}</p>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="border-t bg-[var(--primary-color)] text-white p-4">
        <div className="flex justify-around">
          <button className="flex flex-col items-center">
            <Home className="w-6 h-6" />
          </button>
          <button className="flex flex-col items-center opacity-70">
            <MessageCircle className="w-6 h-6" />
          </button>
          <button className="flex flex-col items-center opacity-70">
            <UserIcon className="w-6 h-6" />
          </button>
          <button className="flex flex-col items-center opacity-70">
            <Calendar className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}